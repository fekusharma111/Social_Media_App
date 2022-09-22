import { createContext, useEffect, useReducer } from "react";
import AuthReducer from "./AuthReducer";

const INITIAL_STATE = {
  user: JSON.parse(localStorage.getItem("user")) || null,
  // {
  //   _id: "631641eb2bf6a77ce7fe8817",
  //   username: "aryan",
  //   email: "aryan@gmail.com",
  //   password: "$2b$10$4NrBcA6xRuP1Pvd76RH6AuiqJRhv6obLHpAA6NTHJS9KNYQDpfP4O",
  //   profilePicture:
  //     "https://firebasestorage.googleapis.com/v0/b/socialmedialatest-715b4.appspot.com/o/ProfilePic%2FIMG_20220104_164922.jpg?alt=media&token=60de05f5-98a6-4ec5-8689-84421c254ae9",
  //   coverPicture: "",
  //   followers: [],
  //   followings: ["631d9fd756a21129baa417c9", "63164e9632902c6e4687cc8e"],
  //   isAdmin: false,
  //   createdAt: { $date: { $numberLong: "1662403051514" } },
  //   updatedAt: { $date: { $numberLong: "1662406825308" } },
  //   __v: { $numberInt: "0" },
  //   desc: "Hii this is aryan desc from server",
  // },

  isFetching: false,
  error: false,
};

export const AuthContext = createContext(INITIAL_STATE);

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(state.user));
  }, [state.user]);

  return (
    <AuthContext.Provider
      value={{
        user: state.user,
        isFetching: state.isFetching,
        error: state.error,
        dispatch,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
