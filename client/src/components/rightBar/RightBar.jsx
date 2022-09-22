import React, { useContext } from "react";
import "./rightbar.css";
import {
  Avatar,
  AvatarGroup,
  Box,
  Button,
  Divider,
  IconButton,
  List,
  Stack,
  Typography,
} from "@mui/material";
import { Users } from "../../dummyData";
import Online from "../online/Online";
import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { Link } from "react-router-dom";
import { Add, Remove } from "@mui/icons-material";

export default function RightBar({ user }) {
  const [friends, setFriends] = useState([]);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const { user: currentUser, dispatch } = useContext(AuthContext);
  const [followed, setFollowed] = useState(
    currentUser.followings.includes(user?.id)
  );

  useEffect(() => {
    const getfriends = async () => {
      try {
        const friendlist = await axios.get("/users/friends/" + user._id);
        setFriends(friendlist.data);
      } catch (error) {
        console.log(error);
      }
    };
    getfriends();
  }, [user]);

  const handlefollowClick = async () => {
    try {
      if (followed) {
        await axios.put(`/users/${user._id}/unfollow`, {
          userId: currentUser._id,
        });
        dispatch({ type: "UNFOLLOW", payload: user._id });
      } else {
        await axios.put(`/users/${user._id}/follow`, {
          userId: currentUser._id,
        });
        dispatch({ type: "FOLLOW", payload: user._id });
      }
      setFollowed(!followed);
    } catch (error) {
      console.log(error);
    }
  };
  const HomeRightbar = () => {
    return (
      <Box flex={2} p={2} sx={{ display: { xs: "none", sm: "block" } }}>
        <Box sx={{ width: "100%" }}>
          <Stack spacing={2}>
            <Box sx={{ display: "flex" }}>
              <Avatar src="/assets/gift.png" sx={{ marginRight: "5px" }} />
              <Typography>
                <b>Pola Foster</b> and <b>3 other friends</b> have a birhday
                today.
              </Typography>
            </Box>
            <Divider />

            <Box>
              <img
                src="/assets/ad.png"
                alt="Advertisement"
                loading="lazy"
                style={{
                  width: "100%",
                  borderRadius: "10px",
                  margin: "30px 0",
                }}
              />
            </Box>
            <Divider />
            <Box>
              <Typography variant="h5" sx={{ mb: "20px  " }}>
                Online Friends
              </Typography>
              <AvatarGroup
                total={24}
                sx={{ display: "flex", justifyContent: "center", mb: "20px  " }}
              >
                <Avatar alt="Remy Sharp" src="/assets/person/2.jpeg" />
                <Avatar alt="Travis Howard" src="/assets/person/3.jpeg" />
                <Avatar alt="Agnes Walker" src="/assets/person/4.jpeg" />
                <Avatar alt="Trevor Henderson" src="/assets/person/5.jpeg" />
              </AvatarGroup>
              <Divider />
              <List>
                {Users.map((u) => (
                  <Online key={u.id} user={u} />
                ))}
              </List>
            </Box>
          </Stack>
        </Box>
      </Box>
    );
  };

  const ProfileRightbar = () => {
    return (
      <>
        {user.username !== currentUser.username && (
          <Button
            variant="contained"
            startIcon={followed ? <Remove /> : <Add />}
            style={{ marginBottom: "10px" }}
            onClick={handlefollowClick}
          >
            {followed ? "Unfollow" : "Follow"}
          </Button>
        )}
        <h4 className="rightbarTitle">User information</h4>
        <div className="rightbarInfo">
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">City:</span>
            <span className="rightbarInfoValue">
              {user.city ? user.city : "N/A"}
            </span>
          </div>
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">From:</span>
            <span className="rightbarInfoValue">
              {user.from ? user.from : "N/A"}
            </span>
          </div>
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">Relationship:</span>
            <span className="rightbarInfoValue">
              {user.relationships ? user.relationships : "N/A"}
            </span>
          </div>
        </div>
        <h4 className="rightbarTitle">User friends</h4>
        <div className="rightbarFollowings">
          {friends.map((friend) => (
            <Link
              key={friend._id}
              to={`/profile/${friend.username}`}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <div className="rightbarFollowing">
                <img
                  src={
                    friend.profilePicture
                      ? friend.profilePicture
                      : PF + "/person/noavatar.jpg"
                  }
                  alt=""
                  className="rightbarFollowingImg"
                />
                <span className="rightbarFollowingName">{friend.username}</span>
              </div>
            </Link>
          ))}
        </div>
      </>
    );
  };
  return (
    <div className="rightbar">
      <div className="rightbarWrapper">
        {user ? <ProfileRightbar /> : <HomeRightbar />}
      </div>
    </div>
  );
}
