import "./card.css";
import React, { useEffect, useState } from "react";
import { db } from "../../config/firebaseConfig";

const Card = ({ post }) => {
  const [loading, setLoading] = useState(true);
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    const unsubscribe = db
      .collection("users")
      .where("uid", "==", post.userId)
      .onSnapshot((querySnapshot) => {
        if (querySnapshot.docs.length) {
          setUserInfo(querySnapshot.docs[0].data());
        }

        setLoading(false);
      });

    return () => unsubscribe();
  }, [post.userId]);

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

  if (loading) return null;

  return (
    <div className="card">
      <img src={post.imageUrl} alt="post" className="card__image" />
      <div className="card__content">
        <img
          className="card__content-thumbnail"
          alt="thumbnail"
          src={userInfo.photoURL}
        />
        <div className="card__content-info">
          <h3 className="card__user-name">{userInfo?.name}</h3>
          <p className="card__date">{post.createdAt.toDate().toDateString()}</p>
        </div>
      </div>
    </div>
  );
};

export default Card;
