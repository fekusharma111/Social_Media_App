import express from "express";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";

import connection from "./database/database.js";
import userroute from "./router/user.js";
import authroute from "./router/auth.js";
import postroute from "./router/posts.js";
import conversationroute from "./router/conversations.js";
import messageroute from "./router/messages.js";

dotenv.config();
const app = express();

//middleware

app.use(express.json());
app.use(helmet());
app.use(morgan("common"));

app.use("/api/users", userroute);
app.use("/api/auth", authroute);
app.use("/api/posts", postroute);
app.use("/api/conversations", conversationroute);
app.use("/api/messages", messageroute);

const Port = process.env.PORT;
const MONGO_URI = process.env.MONGO_URI;
connection(MONGO_URI);
app.listen(Port, () => {
  console.log(`Backend is Running ${Port}`);
});
