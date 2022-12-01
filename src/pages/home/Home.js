import "./home.css";
import React, { useState } from "react";
import { Context } from "../../context/Context";
import Navbar from "../../components/navbar/Navbar";
import Card from "../../components/card/Card";

const Home = () => {
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

  return (
    <>
      <Navbar />
      <div className="container">
        {posts.map((post) => (
          <Card key={post.id} post={post.data()} postId={post.id} />
        ))}
      </div>
    </>
  );
};

export default Home;
