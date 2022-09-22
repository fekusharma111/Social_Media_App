import mongoose from "mongoose";

const conversationSchema = new mongoose.Schema(
  {
    members: {
      type: Array,
    },
  },
  { timestamps: true }
);

const ConversationSchema = mongoose.model("Conversation", conversationSchema);

export default ConversationSchema;
