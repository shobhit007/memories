import "./account.css";
import React, { useEffect, useState } from "react";
import Navbar from "../../components/navbar/Navbar";
import { MoreHorizRounded, CloseRounded } from "@mui/icons-material";
import { db } from "../../config/firebaseConfig";
import { useParams } from "react-router-dom";
import Card from "../../components/card/Card";
import { Context } from "../../context/Context";
import profileImage from "../../images/user.png";

function Account() {
  const { uid } = useParams();
  const {
    logout,
    state: { user },
    updateProfile,
  } = Context();
  const userData = user?.data();

  const [posts, setPosts] = useState([]);
  const [showOptions, setShowOptions] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [name, setName] = useState(userData?.name);
  const [image, setImage] = useState(null);

  useEffect(() => {
    db.collection("memories")
      .where("userId", "==", uid)
      .get()
      .then((query) => query.docs.length && setPosts(query.docs))
      .catch((error) => console.log(error));
  }, [uid]);

  useEffect(() => {
    if (showModal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [showModal]);

  return (
    <div className="account container">
      <Navbar />
      <div className="account__header">
        <img
          src={userData?.photoURL ? userData?.photoURL : profileImage}
          alt="avatar"
          className="account__header-avatar"
        />
        <h3 className="account__header-name">{userData?.name}</h3>
        <MoreHorizRounded
          className="account__header-more__icon"
          onClick={() => setShowOptions((p) => !p)}
        />

        {showOptions && (
          <div className="account__options">
            <span
              className="edit option"
              onClick={() => {
                setShowModal((p) => !p);
                setShowOptions(false);
              }}
            >
              Edit
            </span>
            <span className="logout option" onClick={logout}>
              Logout
            </span>
          </div>
        )}
      </div>

      {showModal && (
        <div className="profile__modal">
          <CloseRounded
            className="profile__modal-btn__close"
            onClick={() => setShowModal((p) => !p)}
          />
          <label>
            <img
              src={userData?.photoURL ? userData?.photoURL : profileImage}
              alt="avatar"
              className="profile__modal-avatar"
            />
            <input
              type={"file"}
              style={{ display: "none" }}
              onChange={(e) => setImage(e.target.files[0])}
            />
          </label>

          <input
            className="input profile__modal-input"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Name"
          />

          <button
            className="profile__modal-btn__update"
            onClick={() => updateProfile({ image, uid: userData.uid, name })}
          >
            Update
          </button>
        </div>
      )}

      {posts.map((doc) => (
        <Card key={doc.id} post={doc.data()} />
      ))}
    </div>
  );
}

export default Account;
