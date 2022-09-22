import express from "express";
import ConversationSchema from "../model/Conversation.js";

const router = express.Router();

//new conversation
router.post("/", async (req, res) => {
  const newconversation = new ConversationSchema({
    members: [req.body.senderId, req.body.receiverId],
  });
  try {
    const savedConversation = await newconversation.save();
    res.status(200).json(savedConversation);
  } catch (error) {
    res.status(500).json(error);
  }
});

// get a conversation
router.get("/:userId", async (req, res) => {
  try {
    const conversation = await ConversationSchema.find({
      members: { $in: [req.params.userId] },
    });
    res.status(200).json(conversation);
  } catch (error) {
    res.status(500).json(error);
  }
});

// get conv includes two userId

router.get("/find/:firstUserId/:secondUserId", async (req, res) => {
  try {
    const conversation = await ConversationSchema.findOne({
      members: { $all: [req.params.firstUserId, req.params.secondUserId] },
    });
    console.log(conversation);
    conversation ? res.status(200).json(conversation) : res.status(203).json("No conversation found");
    // res.status(201).json(conversation);
  } catch (err) {
    res.status(500).json(err);
  }
});

export default router;
