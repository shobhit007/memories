import "./post.css";
import React, { useState } from "react";
import { KeyboardBackspaceRounded } from "@mui/icons-material";
import { Context } from "../../context/Context";
import { useNavigate } from "react-router-dom";

function Post() {
  const [image, setImage] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const navigate = useNavigate();
  const {
    state: { user },
    createNewPost,
  } = Context();

  const handleNewPost = () => {
    if (image && title && description) {
      createNewPost({ title, description, userId: user.data().uid, image });
    }
  };

  return (
    <div className="post">
      <div className="post__top-bar">
        <KeyboardBackspaceRounded
          onClick={() => navigate(-1)}
          className="post__top-bar__back-button"
        />
      </div>
      <input
        type={"text"}
        placeholder="Title"
        className="input"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        type={"text"}
        placeholder="Description"
        className="input"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        rows={"4"}
        cols={"4"}
      />
      <input
        className="input file"
        type={"file"}
        accept="image/*"
        onChange={(e) => setImage(e.target.files[0])}
      />

      <button className="btn__publish" onClick={handleNewPost}>
        Publish
      </button>
    </div>
  );
}

export default Post;
