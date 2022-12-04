import "./home.css";
import React, { useEffect, useState } from "react";
import Navbar from "../../components/navbar/Navbar";
import Card from "../../components/card/Card";
import { db } from "../../config/firebaseConfig";

const Home = () => {
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const unsubscribe = db
      .collection("memories")
      .onSnapshot((querySnapshot) => {
        setPosts(querySnapshot.docs);
        setLoading(false);
      });

    return () => unsubscribe();
  }, []);

  if (loading) return null;

  return (
    <>
      <Navbar />
      <div className="container">
        {posts?.map((post) => (
          <Card key={post.id} post={post.data()} />
        ))}
      </div>
    </>
  );
};

export default Home;
