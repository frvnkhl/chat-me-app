import { useCallback, useEffect, useState } from "react";
import { Socket } from "socket.io-client";
import ChatSidebar from "../components/chatSidebar";
import ReceiveMessages from "../components/receiveMessages";
import SendMessage from "../components/sendMessage";
import { getRoom } from "../services/dataService";

const Chat = ({socket, username, room}: {socket: Socket, username: string, room: string,}) => {
const [roomName, setRoomName] = useState<string>('');

const getRoomName = useCallback(() => {
  getRoom(room).then((res) => {
    console.log({response: res});
    setRoomName(res?.data.rooms.name);
  })
},[room]);

useEffect(() => {
  getRoomName();
}, [getRoomName])


  return (
    <div className="container mx-auto md:flex md:items-stretch">
      <div className="md:w-1/4">
        <ChatSidebar socket={socket} username={username} room={roomName} roomId={room} />
      </div>
      <div className="md:w-3/4">
        <ReceiveMessages socket={socket} />
        <SendMessage socket={socket} username={username} room={room} />
      </div>
    </div>
  );
};

export default Chat;
