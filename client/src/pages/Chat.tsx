import { Socket } from "socket.io-client";
import ChatSidebar from "../components/chatSidebar";
import ReceiveMessages from "../components/receiveMessages";
import SendMessage from "../components/sendMessage";

const Chat = ({socket, username, room}: {socket: Socket, username: string, room: string,}) => {

  return (
    <div className="container mx-auto md:flex md:items-stretch">
      <div className="md:w-1/4">
        <ChatSidebar socket={socket} username={username} room={room} />
      </div>
      <div className="md:w-3/4">
        <ReceiveMessages socket={socket} />
        <SendMessage socket={socket} username={username} room={room} />
      </div>
    </div>
  );
};

export default Chat;
