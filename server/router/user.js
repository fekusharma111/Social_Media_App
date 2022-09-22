import express from "express";
import bcrypt from "bcrypt";
import UserSchema from "../model/User.js";

const router = express.Router();

// Update User
router.put("/:id", async (req, res) => {
  if (req.body.userId === req.params.id || req.body.isAdmin) {
    try {
      if (req.body.password) {
        req.body.password = await bcrypt.hash(req.body.password, 10);
      }
    } catch (error) {
      res.status(500).json(error);
    }
    try {
      const user = await UserSchema.findByIdAndUpdate(req.params.id, {
        $set: req.body,
      });
      res.status(200).json("Account has been updated successfully");
    } catch (error) {
      res.status(500).json(error);
    }
  } else {
    res.status(403).json({ message: "You can update only your account" });
  }
});
// Delete User
router.delete("/:id", async (req, res) => {
  if (req.body.userId === req.params.id || req.body.isAdmin) {
    try {
      const user = await UserSchema.findByIdAndDelete({ _id: req.params.id });
      res.status(200).json("Account has been deleted successfully");
    } catch (error) {
      res.status(500).json(error);
    }
  } else {
    res.status(403).json({ message: "You can delete only your account" });
  }
});
// Get a User
router.get("/", async (req, res) => {
  const userId = req.query.userId;
  const username = req.query.username;
  // console.log(req.params.id);
  try {
    const user = userId
      ? await UserSchema.findById(userId)
      : await UserSchema.findOne({ username: username });
    const { password, updatedAt, ...others } = user._doc;
    res.status(200).json(others);
  } catch (error) {
    res.status(500).json(error);
  }
});

//Get friendlist
router.get("/friends/:userId", async (req, res) => {
  try {
    const user = await UserSchema.findById(req.params.userId);
    const friends = await Promise.all(
      user.followings.map((friendid) => {
        return UserSchema.findById(friendid);
      })
    );
    let friendlist = [];
    friends.map((friend) => {
      const { _id, username, profilePicture } = friend;
      friendlist.push({ _id, username, profilePicture });
    });
    res.status(200).json(friendlist);
  } catch (error) {
    res.status(500).json(error);
  }
});

// follow a user
router.put("/:id/follow", async (req, res) => {
  if (req.body.userId !== req.params.id) {
    try {
      const user = await UserSchema.findById(req.params.id);
      const currentUser = await UserSchema.findById(req.body.userId);
      if (!user.followers.includes(req.body.userId)) {
        await user.updateOne({ $push: { followers: req.body.userId } });
        await currentUser.updateOne({ $push: { followings: req.params.id } });
        res.status(200).json("User has been followed");
      } else {
        res.status(403).json("You already follow this user");
      }
    } catch (error) {
      res.status(500).json(error);
    }
  } else {
    res.status(403).json("You can't follow yourself");
  }
});
// unfollow a user
router.put("/:id/unfollow", async (req, res) => {
  if (req.body.userId !== req.params.id) {
    try {
      const user = await UserSchema.findById(req.params.id);
      const currentUser = await UserSchema.findById(req.body.userId);
      if (user.followers.includes(req.body.userId)) {
        await user.updateOne({ $pull: { followers: req.body.userId } });
        await currentUser.updateOne({ $pull: { followings: req.params.id } });
        res.status(200).json("User has been unfollowed");
      } else {
        res.status(403).json("You dont follow this user");
      }
    } catch (error) {
      res.status(500).json(error);
    }
  } else {
    res.status(403).json("You can't unfollow yourself");
  }
});

export default router;
