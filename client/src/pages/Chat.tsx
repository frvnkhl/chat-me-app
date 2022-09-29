import { useCallback, useEffect, useState } from "react";
import { Socket } from "socket.io-client";
import ChatSidebar from "../components/chatSidebar";
import Nav from "../components/nav";
import ReceiveMessages from "../components/receiveMessages";
import SendMessage from "../components/sendMessage";
import { getRoom } from "../services/dataService";

const Chat = ({
  socket,
  username,
  room,
}: {
  socket: Socket;
  username: string;
  room: string;
}) => {
  const [roomName, setRoomName] = useState<string>("");

  const getRoomName = useCallback(() => {
    getRoom(room).then((res) => {
      setRoomName(res?.data.rooms.name);
    });
  }, [room]);

  useEffect(() => {
    getRoomName();
  }, [getRoomName]);

  
  return (
    <>
      <Nav />
      <div className="container mx-auto max-w-screen-xl flex md:flex-row md:items-stretch flex-col-reverse">
        <div className="sm:w-full sm:flex md:w-1/4">
          <ChatSidebar
            socket={socket}
            username={username}
            room={roomName}
            roomId={room}
          />
        </div>
        <div className="sm:w-full">
          <ReceiveMessages socket={socket} />
          <SendMessage socket={socket} username={username} room={room} />
        </div>
      </div>
    </>
  );
};

export default Chat;
