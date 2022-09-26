import { Typography } from "@material-tailwind/react";
import { useState, useEffect, useRef } from "react";
import { Socket } from "socket.io-client";
import { Message } from "../models/Message";

const ReceiveMessages = ({ socket }: { socket: Socket }) => {
  const [messages, setMessages] = useState<Message[]>([]);

  const messagesColumnRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    socket.on("receiveMessage", (data: Message) => {
      setMessages((state) => [
        ...state,
        {
          message: data.message,
          username: data.username,
          createdTime: data.createdTime,
          room: data.room,
        },
      ]);
    });
    return () => {
      socket.off("receiveMessage");
    };
  }, [messages, socket]);

  useEffect(() => {
    socket.on("last100Messages", (last100Messages) => {
      last100Messages = JSON.parse(last100Messages);
      last100Messages = sortMessagesByDate(last100Messages);
      setMessages((state) => [...last100Messages, ...state]);
    });

    return () => {
      socket.off("last100Messages");
    };
  }, [socket]);

  useEffect(() => {
    if (messagesColumnRef.current !== null) {
      messagesColumnRef.current.scrollTop = messagesColumnRef.current.scrollHeight;
    }
  })

  const sortMessagesByDate = (messages: Message[]) => {
    return messages.sort(
      (a, b) =>
        parseInt(a.createdTime.toString()) -
        parseInt(b.createdTime.toString())
    );
  };

  const formatDateFromTimestamp = (timestamp: Date) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString("en-GB", {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
      day: "numeric",
      month: 'numeric',
      year: "2-digit",
    });
  };

  return (
    <div
      className="bg-[#EEEEEE] border-[1px] border-white rounded-2xl h-[50vh] my-5 mx-3 flex flex-col p-3 overflow-y-auto shadow-md"
      ref={messagesColumnRef}
    >
      {messages.map((msg, i) => (
        <div
          key={i}
          className="bg-[#548CA8] border-[1px] border-cyan-100 p-3 rounded-2xl text-[#EEEEEE] shadow-md m-3"
        >
          <div className="flex justify-between">
            <span>{msg.username}</span>
            <span>{formatDateFromTimestamp(msg.createdTime)}</span>
          </div>
          <div>
            <Typography variant="lead">{msg.message}</Typography>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ReceiveMessages;
