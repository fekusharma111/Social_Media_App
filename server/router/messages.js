import express from "express";
import MessageSchema from "../model/Message.js";

const router = express.Router();

//add messege
router.post("/", async (req, res) => {
  const newMessage = new MessageSchema(req.body);
  try {
    const savedMessage = await newMessage.save();
    res.status(200).json(savedMessage);
  } catch (error) {
    res.status(500).json(error);
  }
});

//get messege
router.get("/:conversationId", async (req, res) => {
  try {
    const messages = await MessageSchema.find({
      conversationId: req.params.conversationId,
    });
    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json(error);
  }
});

export default router;
