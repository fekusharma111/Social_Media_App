import express from "express";
import PostSchema from "../model/Post.js";
import UserSchema from "../model/User.js";

const router = express.Router();

// Create a post
router.post("/", async (req, res) => {
  // Create a new post
  const newPost = new PostSchema(req.body);
  try {
    const savedPost = await newPost.save();
    res.status(200).json(savedPost);
  } catch (error) {
    res.status(500).json(error);
  }
});

// Update a post
router.put("/:id", async (req, res) => {
  try {
    const post = await PostSchema.findById(req.params.id);
    // if users id through requeset and posts userid through db is same
    if (post.userId === req.body.userId) {
      await post.updateOne({ $set: req.body });
      res.status(200).json("Post has been updated");
    }
    // if users id through requeset and posts userid through db is not same
    else {
      res.status(403).json("You can update only your posts");
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

// Delete a post
router.delete("/:id", async (req, res) => {
  try {
    const post = await PostSchema.findById(req.params.id);
    // if users id through requeset and posts userid through db is same
    if (post.userId === req.body.userId) {
      await post.deleteOne();
      res.status(200).json("Post has been Deleted");
    }
    // if users id through requeset and posts userid through db is not same
    else {
      res.status(403).json("You can delete only your post");
    }
  } catch (error) {
    res.status(500).json(error);
  }
});
// get a post
router.get("/:id", async (req, res) => {
  try {
    const post = await PostSchema.findById(req.params.id);
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json(error);
  }
});
// Like a post
router.put("/:id/like", async (req, res) => {
  try {
    const post = await PostSchema.findById(req.params.id);
    if (!post.likes.includes(req.body.userId)) {
      await post.updateOne({ $push: { likes: req.body.userId } });
      res.status(200).json("Post has been Liked");
    } else {
      await post.updateOne({ $pull: { likes: req.body.userId } });
      res.status(200).json("Post has been unLiked");
    }
  } catch (error) {
    res.status(500).json(error);
  }
});
// get timeline posts
router.get("/timeline/:userId", async (req, res) => {
  try {
    const currentUser = await UserSchema.findById({ _id: req.params.userId });
    const userPosts = await PostSchema.find({ userId: currentUser._id });
    const friendsPosts = await Promise.all(
      currentUser.followings.map((friendId) => {
        return PostSchema.find({ userId: friendId });
      })
    );
    res.status(200).json(userPosts.concat(...friendsPosts));
  } catch (error) {
    res.status(500).json(error);
  }
});
// get users all posts
router.get("/profile/:username", async (req, res) => {
  try {
    const user = await UserSchema.findOne({ username: req.params.username });
    const posts = await PostSchema.find({ userId: user._id });

    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json(error);
  }
});

export default router;
