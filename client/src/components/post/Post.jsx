import {
  Avatar,
  Box,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  IconButton,
  Typography,
} from "@mui/material";
import {
  BookmarkBorder,
  FavoriteBorder,
  MapsUgcOutlined,
  MoreVert,
  Send,
} from "@mui/icons-material";
import React, { useEffect, useState } from "react";
import FavoriteIcon from "@mui/icons-material/Favorite";
import axios from "axios";
import { format } from "timeago.js";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

const Post = ({ post }) => {
  const [like, setLike] = useState(post.likes.length);
  const [isliked, setisliked] = useState(false);
  const [user, setUser] = useState({});
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const photo = PF + post.img;
  const { user: currentUser } = useContext(AuthContext);

  useEffect(() => {
    setisliked(post.likes.includes(currentUser._id));
  }, [post.likes, currentUser._id]);

  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get(`/users?userId=${post.userId}`);
      setUser(res.data);
    };
    fetchUser();
  }, [post.userId]);

  const likehandler = async () => {
    try {
      await axios.put(`/posts/${post._id}/like`, { userId: currentUser._id });
      setLike(isliked ? like - 1 : like + 1);
      setisliked(!isliked);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box>
      <Card sx={{ margin: 5 }}>
        <CardHeader
          avatar={
            <Link to={`/profile/${user.username}`}>
              <Avatar
                sx={{ bgcolor: "red" }}
                src={user.profilePicture || PF + "/person/noavatar.jpg"}
              />
            </Link>
          }
          action={
            <IconButton aria-label="settings">
              <MoreVert />
            </IconButton>
          }
          title={user.username}
          subheader={format(post.createdAt)}
        />
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            {post.description}
          </Typography>
        </CardContent>
        <CardMedia
          component="img"
          // height="194"
          image={post.img}
          alt={`${user.username}'s post image`}
        />
        <CardActions disableSpacing>
          <IconButton aria-label="add to favorites" onClick={likehandler}>
            {isliked ? (
              <FavoriteIcon sx={{ color: "red" }} />
            ) : (
              <FavoriteBorder />
            )}
          </IconButton>
          <IconButton aria-label="comment">
            <MapsUgcOutlined />
          </IconButton>
          <IconButton aria-label="share">
            <Send />
          </IconButton>

          <IconButton aria-label="Bookmark" sx={{ marginLeft: "auto" }}>
            <BookmarkBorder />
          </IconButton>
        </CardActions>
        <CardActions sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography>{like} people like it</Typography>
          <Typography>{post.comment} comments</Typography>
        </CardActions>
      </Card>
    </Box>
  );
};

export default Post;
