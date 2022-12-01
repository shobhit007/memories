import "./account.css";
import React, { useEffect, useState } from "react";
import Navbar from "../../components/navbar/Navbar";
import { MoreHorizRounded } from "@mui/icons-material";
import { db } from "../../config/firebaseConfig";
import { useParams } from "react-router-dom";
import Card from "../../components/card/Card";

function Account() {
  const { uid } = useParams();
  const [posts, setPosts] = useState([]);
  const [showOptions, setShowOptions] = useState(false);

  useEffect(() => {
    db.collection("memories")
      .where("uid", "==", uid)
      .get()
      .then((query) => query.docs.length && setPosts(query.docs))
      .catch((error) => console.log(error));
  }, []);

  return (
    <div className="account container">
      <Navbar />
      <div className="account__header">
        <img
          src="https://www.rd.com/wp-content/uploads/2017/09/01-shutterstock_476340928-Irina-Bg.jpg?fit=640,427"
          alt="avatar"
          className="account__header-avatar"
        />
        <h3 className="account__header-name">Victoria Quber</h3>
        <MoreHorizRounded
          className="account__header-more__icon"
          onClick={() => setShowOptions((p) => !p)}
        />

        {showOptions && (
          <div className="account__options">
            <span className="edit option">Edit</span>
            <span className="logout option">Logout</span>
          </div>
        )}
      </div>

      <div className="profile__modal">
        <img
          src="https://www.rd.com/wp-content/uploads/2017/09/01-shutterstock_476340928-Irina-Bg.jpg?fit=640,427"
          alt="avatar"
          className="account__header-avatar"
        />

        <input className="" value={"Victoria Quber"} placeholder="Name" />

        <button>Update</button>
      </div>

      {posts.map((doc) => (
        <Card key={doc.id} post={doc.data()} />
      ))}
    </div>
  );
}

export default Account;
