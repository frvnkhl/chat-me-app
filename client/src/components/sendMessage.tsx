import { Button, Input } from "@material-tailwind/react";
import { useState, useEffect, ChangeEvent } from "react";
import { Socket } from "socket.io-client";

const SendMessage = ({
  socket,
  username,
  room,
}: {
  socket: Socket;
  username: string;
  room: string;
}) => {
  const [message, setMessage] = useState("");

  const handleNewMessageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setMessage(value);
  };

  const handleSendMessage = () => {
    if (message !== "") {
      const createdTime = Date.now();

      socket.emit("sendMessage", {username, room, message, createdTime});
      setMessage('');
    }
  };

  return (
    <div className="flex w-[75vw]">
      <Input
        label="Write a message"
        name="newMessage"
        value={message}
        onChange={handleNewMessageChange}
        className="mr-2"
        color="indigo"
      />
      <Button className="ml-2" color="indigo" onClick={handleSendMessage}>
        Send
      </Button>
    </div>
  );
};

export default SendMessage;