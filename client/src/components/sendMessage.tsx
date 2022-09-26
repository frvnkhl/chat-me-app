import { Button, Input } from "@material-tailwind/react";
import { useState, ChangeEvent, KeyboardEvent } from "react";
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

      socket.emit("sendMessage", { username, room, message, createdTime });
      setMessage("");
    }
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if(event.key === "Enter") {
      handleSendMessage();
    }
  }

  return (
    <div
      className="flex mx-3 bg-[#EEEEEE] border-[1px] border-white rounded-2xl p-3 shadow-md"
      onKeyDown={handleKeyDown}
    >
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
