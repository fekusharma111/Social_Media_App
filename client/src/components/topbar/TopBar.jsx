import { Message, Notifications, Pets, Person } from "@mui/icons-material";
import {
  AppBar,
  Avatar,
  Badge,
  Box,
  InputBase,
  Menu,
  MenuItem,
  styled,
  Toolbar,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

const StyledToolbar = styled(Toolbar)({
  display: "flex",
  justifyContent: "space-between",
});

const Search = styled("div")(({ theme }) => ({
  backgroundColor: "white",
  padding: "0 10px",
  borderRadius: theme.shape.borderRadius,
  width: "40%",
}));

const Icons = styled(Box)(({ theme }) => ({
  display: "none",
  alignItems: "center",
  gap: "20px",
  [theme.breakpoints.up("sm")]: {
    display: "flex",
  },
}));

const UserBox = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: "10px",
  [theme.breakpoints.up("sm")]: {
    display: "none",
  },
}));
const Navbar = () => {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const { user, dispatch } = useContext(AuthContext);
  const [open, setOpen] = useState(false);
  const handleLogOut = () => {
    dispatch({ type: "LOGOUT" });
  };

  return (
    <AppBar position="sticky">
      <StyledToolbar>
        <Link to="/" style={{ textDecoration: "none" }}>
          <Typography
            variant="h6"
            sx={{
              display: {
                xs: "none",
                sm: "block",

                color: "white",
                cursor: "pointer",
              },
            }}
          >
            D'SAM Social
          </Typography>
        </Link>
        <Pets sx={{ display: { xs: "block", sm: "none" } }} />
        <Search>
          <InputBase placeholder="search..." />
        </Search>
        <Icons>
          <Badge badgeContent={4} color="error">
            <Person color="white" sx={{ fontSize: 25 }} />
          </Badge>
          <Link
            to="/messenger"
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <Badge badgeContent={4} color="error">
              <Message color="white" sx={{ fontSize: 25 }} />
            </Badge>
          </Link>
          <Badge badgeContent={4} color="error">
            <Notifications color="white" sx={{ fontSize: 25 }} />
          </Badge>
          <Avatar
            sx={{ width: 30, height: 30 }}
            src={
              user.profilePicture ? user.profile : PF + "person/noavatar.jpg"
            }
            onClick={(e) => setOpen(true)}
          />
        </Icons>
        <UserBox onClick={(e) => setOpen(true)}>
          <Avatar sx={{ width: 30, height: 30 }} src={user.profilePicture} />
          <Typography variant="span">{user.username}</Typography>
        </UserBox>
      </StyledToolbar>
      <Menu
        id="demo-positioned-menu"
        aria-labelledby="demo-positioned-button"
        open={open}
        onClose={(e) => setOpen(false)}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <Link
          to={`/profile/${user.username}`}
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <MenuItem>Profile</MenuItem>
        </Link>
        <Link
          to={`/profile/${user.username}`}
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <MenuItem>My account</MenuItem>
        </Link>

        <MenuItem onClick={handleLogOut}>Logout</MenuItem>
      </Menu>
    </AppBar>
  );
};

export default Navbar;
