import React, { useEffect, useState } from "react";
import "./home.css";
import { AiOutlineLike, AiFillPlusSquare } from "react-icons/ai";
import { IoMdClose } from "react-icons/io";
import { Context } from "../../context/Context";
import FileBase64 from "react-file-base64";

const Home = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [toggleModal, setToggleModal] = useState(false);

  const { state, logout, createNewPost, likeANewPost, disLiikePost } =
    Context();
  const { user, posts } = state;

  // const getBase64Url = (file) => {
  //   return new Promise((resolve, reject) => {
  //     const reader = new FileReader();
  //     reader.readAsDataURL(file);
  //     reader.onload = () => resolve(reader.result);
  //     reader.onerror = () => reject(reader.error);
  //   });
  // };

  const Card = ({ post, postId }) => {
    const [liked, setLiked] = useState(false);

    useEffect(() => {
      if (post.liked) {
        const filteredPost = post.liked.filter((id) => user.uid === id);
        if (filteredPost.length) setLiked(true);
      }
    }, [post]);

    const likeOrDislikeAPost = () => {
      if (liked) {
        disLiikePost(postId, user.uid);
      } else {
        likeANewPost(postId, user.uid);
      }
    };

    return (
      <div className="memory__home-card_container_card">
        <div className="card_image">
          <img src={post.imageUrl} alt="post_image" />
        </div>
        <div className="card_content">
          <div className="card_content-title">
            <h3 className="title">{post.title}</h3>
          </div>
          <div className="card_content-description">
            <p className="description">{post.description}</p>
          </div>
        </div>
        <div className="card_icons">
          <div className="like_icon_container">
            <AiOutlineLike
              size={20}
              className="icon"
              onClick={likeOrDislikeAPost}
              style={{ color: liked && "blue" }}
            />
            {post.likeCount > 0 && <p>{post.likeCount}</p>}
          </div>
        </div>
      </div>
    );
  };

  const backToInitialState = () => {
    setTitle("");
    setDescription("");
    setImage(null);
  };

  const createANewMemory = () => {
    createNewPost(title, description, user.uid, image);
    backToInitialState();
    setToggleModal(false);
  };

  const CreateMemoryFormCard = () => (
    <div className="memory__home-create_container">
      <h3>Share Your Memory</h3>
      <div>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(ev) => setTitle(ev.target.value)}
        />
        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(ev) => setDescription(ev.target.value)}
        />
        <FileBase64 multiple={false} onDone={(value) => setImage(value)} />
        <button type="button" onClick={createANewMemory}>
          share
        </button>
        <button type="button" className="logout" onClick={logout}>
          Log out
        </button>
      </div>
    </div>
  );

  return (
    <>
      <div className="home__navbar">
        <div>
          <AiFillPlusSquare
            size={24}
            className="plus_icon"
            onClick={() => setToggleModal(true)}
          />
        </div>
      </div>
      <div className="memory__home">
        <div
          style={{
            display: toggleModal ? "flex" : "none",
            justifyContent: "center",
            alignItems: "center",
            position: "absolute",
            top: 0,
            bottom: 0,
            right: 0,
            left: 0,
            backgroundColor: "rgba(0,0,0,0.75)",
            padding: "1.2rem 2rem",
          }}
        >
          <IoMdClose
            size={28}
            color="#fff"
            style={{
              position: "absolute",
              top: "1rem",
              right: "1rem",
              zIndex: 2,
            }}
            onClick={() => setToggleModal(false)}
          />
          <div
            style={{
              display: "flex",
              minHeight: "344px",
              flex: 1,
              flexDirection: "column",
              padding: "0.5rem",
              background: "#fff",
              justifyContent: "center",
              borderRadius: "4px",
            }}
          >
            <input
              placeholder="Title"
              type={"text"}
              value={title}
              style={{
                width: "100%",
                padding: "0.75rem",
                border: "1px solid gray",
                backgroundColor: "#eee",
                borderRadius: "4px",
                marginBottom: "0.4rem",
              }}
              onChange={(ev) => setTitle(ev.target.value)}
            />
            <input
              placeholder="Description"
              type={"text"}
              value={description}
              style={{
                width: "100%",
                padding: "0.75rem",
                border: "1px solid gray",
                backgroundColor: "#eee",
                borderRadius: "4px",
                marginBottom: "1rem",
              }}
              onChange={(ev) => setDescription(ev.target.value)}
            />
            <FileBase64 multiple={false} onDone={(data) => setImage(data)} />
            <button
              style={{
                padding: "0.5rem",
                backgroundColor: "#ac7088",
                border: "none",
                borderRadius: "4px",
                color: "#fff",
                fontWeight: "600",
                fontSize: "14px",
                marginTop: "2rem",
              }}
              onClick={createANewMemory}
            >
              share
            </button>

            <button
              style={{
                padding: "0.5rem",
                backgroundColor: "#ff1e00",
                border: "none",
                borderRadius: "4px",
                color: "#fff",
                fontWeight: "600",
                fontSize: "14px",
                marginTop: ".64rem",
              }}
              onClick={logout}
            >
              Log out
            </button>
          </div>
        </div>
        <div className="memory__home-card_container">
          {posts &&
            posts.map((post) => (
              <Card post={post.data()} key={post.id} postId={post.id} />
            ))}
        </div>
        <CreateMemoryFormCard />
      </div>
    </>
  );
};

export default Home;
