import React, { useEffect, useState } from "react";
import TopBar from "../../components/topbar/TopBar";
import SideBar from "../../components/sidebar/SideBar";
import Feed from "../../components/feed/Feed";
import RightBar from "../../components/rightBar/RightBar";

import "./profile.css";
import axios from "axios";
import { useParams } from "react-router-dom";

const Home = () => {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [user, setUser] = useState({});
  const username = useParams().username;

  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get(`/users?username=${username}`);
      setUser(res.data);
    };
    fetchUser();
  }, [username]);
  return (
    <>
      <div className="container">
        <div className="topbar">
          <TopBar />
        </div>
        <div className="sidebar">
          <SideBar />
        </div>
        <div className="profilebar">
          <div className="profileRight">
            <div className="profileRightTop">
              <div className="profileCover">
                <img
                  className="profileCoverImg"
                  src={user.coverPicture || PF + "person/nocover.jpg"}
                  alt=""
                />
                <img
                  className="profileUserImg"
                  src={user.profilePicture || PF + "person/noavatar.jpg"}
                  alt=""
                />
              </div>
              <div className="profileInfo">
                <h4 className="profileInfoName">{user.username}</h4>
                <span className="profileInfoDesc">{user.desc}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="feed">
          <Feed username={username} />
        </div>
        <div className="rightbar">
          <RightBar user={user} />
        </div>
      </div>
    </>
  );
};

export default Home;
