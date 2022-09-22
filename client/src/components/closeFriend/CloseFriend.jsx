import { Avatar, ListItem, ListItemAvatar, ListItemText } from "@mui/material";
import React from "react";

const CloseFriend = ({ user }) => {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  return (
    <ListItem>
      <ListItemAvatar>
        <Avatar alt="name" src={PF + user.profilePicture} />
      </ListItemAvatar>
      <ListItemText primary={user.username}></ListItemText>
    </ListItem>
  );
};

export default CloseFriend;
