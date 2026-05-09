import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { createSocketConnection } from "../utils/socket";
import { useSelector } from "react-redux";
import { BASE_URL } from "../utils/constants";
import axios from "axios";

const Chat = () => {
  const { targetUserId } = useParams();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const user = useSelector((store) => store.user);
  const userId = user?._id;
  const socketRef = useRef(null);

  const sendMessage = () => {
    socketRef.current.emit("sendMessage", {
      firstName: user.firstName,
      targetUserId,
      text: newMessage,
    });
    setNewMessage("");
  };

  const fetchAllMessages = async () => {
    const chat = await axios.get(BASE_URL + "/chat/" + targetUserId, {
      withCredentials: true,
    });

    const chatMessages = chat?.data?.messages.map((msg) => {
      const { senderId, text, createdAt } = msg;
      return {
        firstName: senderId?.firstName,
        text,
        createdAt,
      };
    });
    setMessages(chatMessages);
  };

  useEffect(() => {
    fetchAllMessages();
  }, [targetUserId]);

  useEffect(() => {
    if (!userId) {
      return;
    }
    socketRef.current = createSocketConnection();
    socketRef.current.emit("joinChat", { targetUserId });

    socketRef.current.on(
      "messageRecieved",
      ({ firstName, text, createdAt }) => {
        setMessages((messages) => [
          ...messages,
          { firstName, text, createdAt },
        ]);
      },
    );

    //leave chat when component unmounts
    return () => {
      socketRef.current.disconnect();
    };
  }, [userId, targetUserId]);

  return (
    <div className="flex flex-col h-[75vh] w-full max-w-2xl mx-auto mt-6 bg-base-200 rounded-xl shadow-lg overflow-hidden">
      {/* Header */}
      <h1 className="px-5 py-4 bg-base-100 border-b text-lg font-semibold">
        Chat
      </h1>

      {/* Chat Body */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
        {messages.map((msg, index) => {
          return (
            <div key={index} className="space-y-2">
              <div
                className={
                  "chat " +
                  (user.firstName === msg.firstName ? "chat-end" : "chat-start")
                }
              >
                <div className="chat-header text-xs opacity-70">
                  {msg.firstName}
                  <time className="ml-2 opacity-50">
                    {new Date(msg.createdAt).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </time>
                </div>
                <div className="chat-bubble">{msg.text}</div>
                <div className="chat-footer text-xs opacity-50">Seen</div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Input */}
      <div className="flex items-center gap-2 p-3 bg-base-100 border-t">
        <input
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          className="flex-1 input input-bordered"
          placeholder="Type a message..."
        />
        <button onClick={sendMessage} className="btn btn-primary">
          Send
        </button>
      </div>
    </div>
  );
};

export default Chat;
