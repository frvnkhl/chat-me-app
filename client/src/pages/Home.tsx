import { ChangeEvent, Dispatch, SetStateAction } from "react";
import { Alert, Button, Input } from "@material-tailwind/react";
import { Socket } from "socket.io-client";
import { useNavigate } from "react-router-dom";

const Home = ({
  username,
  setUsername,
  room,
  setRoom,
  socket,
}: {
  username: string;
  setUsername: Dispatch<SetStateAction<string>>;
  room: string;
  setRoom: Dispatch<SetStateAction<string>>;
  socket: Socket;
}) => {
  const navigate = useNavigate();
  const handleNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setUsername(value);
    console.log(username);
  };

  const handleRoomChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const { value } = event.target;
    setRoom(value);
    console.log(value);
  };

  const handleEnterChat = () => {
    if (username !== "" && room !== "") {
      socket.emit("joinRoom", { username, room });
      navigate("/chat", { replace: true });
    } else {
      return <Alert color="red">Filling out your name is a must!</Alert>;
    }
  };

  return (
    <div className="container mt-[30%] mx-auto text-center">
      <h1 className="text-3xl my-2 font-bold">Enter your name</h1>
      <Input
        label="name"
        name="name"
        color="indigo"
        value={username}
        onChange={handleNameChange}
      />
      <div className="w-72 ">
        <label htmlFor="room">Choose room</label>
        <select id="room" onChange={handleRoomChange}>
          <option value="main">Main room</option>
          <option value="tech">Tech</option>
          <option value="gossip">Gossip</option>
          <option value="travel">Travelling</option>
        </select>
      </div>
      <Button className="mt-2" color='indigo' onClick={handleEnterChat}>
        Enter Chat
      </Button>
    </div>
  );
};

export default Home;
