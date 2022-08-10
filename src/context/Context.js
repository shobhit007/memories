import React, { useContext, useReducer, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, db, storage, firebase } from "../config/firebaseConfig";

const context = React.createContext();

export const Context = () => useContext(context);

const reducer = (state, action) => {
  switch (action.type) {
    case "user":
      return { ...state, user: action.payload };
    case "posts":
      return { ...state, posts: action.payload };
    case "logout":
      return { user: null, posts: null };
    default:
      return state;
  }
};

export const Provider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, { user: null, posts: null });
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (!user) {
        dispatch({ type: "logout" });
        setLoading(false);
        navigate("/login");
      }

      dispatch({ type: "user", payload: user });
      getAllPosts();
      setLoading(false);
    });

    return () => unsubscribe();
  }, [navigate]);

  const loginWithEmailAndPassword = async (email, password) => {
    await auth
      .signInWithEmailAndPassword(email, password)
      .then(() => navigate("/"))
      .catch((err) => console.log(err));
  };

  const createUser = async (email, password) => {
    await auth
      .createUserWithEmailAndPassword(email, password)
      .then(() => navigate("/"))
      .catch((err) => console.log(err));
  };

  const logout = () => {
    auth
      .signOut()
      .then(() => {
        dispatch({ type: "logout" });
        navigate("/login");
      })
      .catch((err) => console.log(err));
  };

  const loginWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithRedirect(provider);
  };

  async function createNewPost(title, description, uid, image) {
    const storageRef = storage.ref("images");
    const ref = storageRef.child(`${uid}/${image.name}`);
    const metadata = {
      contentType: image.type,
    };
    const uploadTask = ref.put(image.file, metadata);
    const imageRef = (await uploadTask).ref.getDownloadURL();

    imageRef
      .then(async (imageUrl) => {
        await db
          .collection("memories")
          .add({ title, description, uid, imageUrl })
          .then(() => console.log("post uploaded"))
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
  }

  function getAllPosts() {
    try {
      const unsubscribe = db
        .collection("memories")
        .onSnapshot((snapshot) =>
          dispatch({ type: "posts", payload: snapshot.docs })
        );

      return () => unsubscribe();
    } catch (err) {
      console.log(err);
    }
  }

  const likeANewPost = (postId, currentUserId) => {
    const postRef = db.collection("memories").doc(postId);
    try {
      postRef.update({
        likeCount: firebase.firestore.FieldValue.increment(1),
        liked: firebase.firestore.FieldValue.arrayUnion(currentUserId),
      });
    } catch (error) {
      console.log(error);
    }
  };

  const disLiikePost = (postId, currentUserId) => {
    const postRef = db.collection("memories").doc(postId);
    try {
      postRef.update({
        likeCount: firebase.firestore.FieldValue.increment(-1),
        liked: firebase.firestore.FieldValue.arrayRemove(currentUserId),
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <context.Provider
      value={{
        state,
        logout,
        loginWithEmailAndPassword,
        createUser,
        createNewPost,
        getAllPosts,
        likeANewPost,
        disLiikePost,
        loginWithGoogle,
      }}
    >
      {!loading && children}
    </context.Provider>
  );
};
