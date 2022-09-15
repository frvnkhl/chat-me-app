import { Button, Typography } from "@material-tailwind/react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Socket } from "socket.io-client";
import { User } from "../models/User";

const ChatSidebar = ({
  socket,
  username,
  room,
  roomId,
}: {
  socket: Socket;
  username: string;
  room: string;
  roomId: string;
}) => {
  const [roomUsers, setRoomUsers] = useState<User[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    socket.on("chatRoomUsers", (data: User[]) => {
      // console.log(data);
      setRoomUsers(data);
    });
    return () => {
      socket.off("chatRoomUsers");
    };
  }, [socket]);

  const leaveRoom = () => {
    const createdTime = Date.now();
    socket.emit("leaveRoom", { username, room: roomId, createdTime });

    navigate("/", { replace: true });
  };

  return (
    <div className="bg-[#548CA8] rounded-xl p-3 my-5 mx-3 text-[#EEEEEE] flex flex-col justify-between h-full shadow-md overflow-auto">
      <Typography variant="h3">{`${room} room`}</Typography>
      <div className="flex-1">
        {roomUsers.length > 0 && <Typography variant="h5">Users:</Typography>}
        <ul className="list-none">
          {roomUsers.map((user) => (
            <li
              style={{
                fontWeight: `${user.username === username ? "bold" : "normal"}`,
              }}
              key={user.id}
            >
              {user.username}
            </li>
          ))}
        </ul>
      </div>
      <Button color="indigo" onClick={leaveRoom}>
        Leave
      </Button>
    </div>
  );
};

export default ChatSidebar;
