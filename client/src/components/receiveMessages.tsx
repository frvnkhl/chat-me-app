import { Typography } from "@material-tailwind/react";
import { useState, useEffect } from "react";
import { Socket } from "socket.io-client";
import { Message } from "../models/Message";

const ReceiveMessages = ({ socket }: { socket: Socket }) => {
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    socket.on("receiveMessage", (data: Message) => {
      console.log({ data: data });
      setMessages((state) => [
        ...state, 
        {
          message: data.message,
          username: data.username,
          createdTime: data.createdTime,
          room: data.room,
        }
      ]);
    });
    return () => {
      socket.off("receiveMessage");
    };
  }, [messages, socket]);

  const formatDateFromTimestamp = (timestamp: Date) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString();
  };

  return (
    <div className="w-[75vw] bg-[#EEEEEE] rounded-2xl my-5 h-[50vh] p-3 overflow-auto shadow-md">
      <ul className="list-none">
        {messages.map((msg, i) => (
          <div key={i} className="bg-[#548CA8] p-3 rounded-2xl text-[#EEEEEE] shadow-md m-3">
            <div className="flex justify-between">
              <span>{msg.username}</span>
              <span>{formatDateFromTimestamp(msg.createdTime)}</span>
            </div>
            <div>
              <Typography variant="lead">{msg.message}</Typography>
            </div>
          </div>
        ))}
      </ul>
    </div>
  );
};

export default ReceiveMessages;
