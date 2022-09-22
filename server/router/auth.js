import express from "express";
import bcrypt from "bcrypt";
import UserSchema from "../model/User.js";

const router = express.Router();

// REGISTER
router.post("/register", async (req, res) => {
  try {
    // Generate new password
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    // Set new password
    const newuser = new UserSchema({
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
    });
    // sava and respond
    const user = await newuser.save();
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json("Error: " + error.message);
  }
});

//LOGIN
router.post("/login", async (req, res) => {
  try {
    const user = await UserSchema.findOne({ email: req.body.email });
    if (!user) {
      res.status(404).json({ message: "user not found" });
    }

    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );

    if (!validPassword) {
      res.status(404).json("Wrong password");
    } else {
      res.status(200).json(user);
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

export default router;
