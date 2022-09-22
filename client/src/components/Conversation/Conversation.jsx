import axios from "axios";
import { useEffect, useState } from "react";
import "./Conversation.css";

const Conversation = ({ conversation, CurrentUser }) => {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [user, setUser] = useState({});

  useEffect(() => {
    const friendId = conversation.members.find((m) => m !== CurrentUser._id);
    const geUser = async () => {
      try {
        const res = await axios.get("/users?userId=" + friendId);
        setUser(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    geUser();
  }, [conversation, CurrentUser]);

  return (
    <div className="conversation">
      <img
        src={
          user.profilePicture
            ? user?.profilePicture
            : PF + "/person/noavatar.jpg"
        }
        alt="Profileimg"
        className="conversationImg"
      />
      <span className="conversationName">{user?.username}</span>
    </div>
  );
};

export default Conversation;
