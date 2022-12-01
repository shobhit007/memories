import "./card.css";
import React, { useEffect, useState } from "react";

const Card = ({ post }) => {
  const [liked, setLiked] = useState(false);

  // useEffect(() => {
  //   if (post.liked) {
  //     const filteredPost = post.liked.filter((id) => user.uid === id);
  //     if (filteredPost.length) setLiked(true);
  //   }
  // }, [post]);

  // const likeOrDislikeAPost = () => {
  //   if (liked) {
  //     disLiikePost(postId, user.uid);
  //   } else {
  //     likeANewPost(postId, user.uid);
  //   }
  // };

  return (
    <div className="card">
      <img src={post.imageUrl} alt="post" className="card__image" />
      <div className="card__content">
        <img
          className="card__content-thumbnail"
          alt="thumbnail"
          src="https://i.ebayimg.com/images/g/XkIAAOSw6Idh-6lR/s-l500.jpg"
        />
        <div className="card__content-info">
          <h3 className="card__title">{post.title}</h3>
        </div>
      </div>
    </div>
  );
};

export default Card;
