import { Socket } from "socket.io-client";
import ReceiveMessages from "../components/receiveMessages";
import SendMessage from "../components/sendMessage";

const Chat = ({socket, username, room}: {socket: Socket, username: string, room: string,}) => {

  return (
    <div className="container mx-auto">
      <ReceiveMessages socket={socket} />
      <SendMessage socket={socket} username={username} room={room} />
    </div>
  );
};

export default Chat;
