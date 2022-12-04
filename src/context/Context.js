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
      return { ...state, posts: [...action.payload] };
    case "logout":
      return { user: null, posts: [] };
    default:
      return state;
  }
};

export const Provider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, { user: null, posts: [] });
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        db.collection("users")
          .where("uid", "==", user.uid)
          .onSnapshot((querySnapshot) => {
            dispatch({ type: "user", payload: querySnapshot.docs[0] });
          });
      }

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

  const createUser = async (email, password, name) => {
    try {
      const res = await auth.createUserWithEmailAndPassword(email, password);

      if (res.user) {
        await db
          .collection("users")
          .add({ name, email: res.user.email, uid: res.user.uid })
          .then(() => navigate("/"));
      }
    } catch (error) {
      console.log(error);
    }
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

  const loginWithGoogle = async () => {
    try {
      const provider = new firebase.auth.GoogleAuthProvider();
      auth.signInWithPopup(provider).then(async (result) => {
        const user = result.user;
        if (result.additionalUserInfo.isNewUser) {
          await db
            .collection("users")
            .add({
              name: user.displayName,
              email: user.email,
              uid: user.uid,
              photoURL: user.photoURL,
            })
            .then(() => console.log("user logged in with google"));
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  async function createNewPost({ title, description, userId, image }) {
    const storageRef = storage.ref("memories");
    const ref = storageRef.child(`${userId}/${image.name}`);
    const metadata = {
      contentType: image.type,
    };
    const uploadTask = ref.put(image, metadata);
    const imageRef = (await uploadTask).ref.getDownloadURL();

    imageRef
      .then(async (imageUrl) => {
        await db
          .collection("memories")
          .add({
            title,
            description,
            userId,
            imageUrl,
            createdAt: firebase.firestore.Timestamp.now(),
          })
          .then(() => navigate("/", { replace: true }))
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
  }

  const updateProfile = async ({ image, name, uid }) => {
    try {
      const storageRef = storage.ref("profileImages");
      const ref = storageRef.child(`/${uid}/${image.name}`);
      const metadata = {
        contentType: image.type,
      };
      const uploadTask = ref.put(image, metadata);
      const imageRef = (await uploadTask).ref.getDownloadURL();

      imageRef.then(async (imageUrl) => {
        await db
          .collection("users")
          .doc(state.user?.id)
          .update({ name, photoURL: imageUrl })
          .then(() => console.log("user updated!"));
      });
    } catch (error) {}
  };

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
        updateProfile,
      }}
    >
      {!loading && children}
    </context.Provider>
  );
};
