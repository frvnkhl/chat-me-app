import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from "react";
import { Button, Typography } from "@material-tailwind/react";
import { Socket } from "socket.io-client";
import { useNavigate } from "react-router-dom";
import NewRoomForm from "../components/newRoomForm";
import RoomPicker from "../components/roomPicker";
import { getAllRooms } from "../services/dataService";
import LoadingSpinner from "../components/micro/loadingSpinner";

const Home = ({
  username,
  room,
  setRoom,
  socket,
  user,
  loading,
  setLoading,
}: {
  username: string;
  room: string;
  setRoom: Dispatch<SetStateAction<string>>;
  socket: Socket;
  user: any;
  loading: boolean;
  setLoading: Dispatch<SetStateAction<boolean>>;
}) => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [rooms, setRooms] = useState<any[]>([]);

  const fetchRooms = () => {
    
  };

  useEffect(() => {
    getAllRooms()
      .then((res) => {
        console.log({ res: res?.data.rooms });
        setRooms(res?.data.rooms);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, []);

  if (loading || rooms === undefined) {
    return <LoadingSpinner />;
  }
  return (
    <div className="container mt-[30%] mx-auto text-center bg-[#eeeeee] rounded-2xl p-3 shadow-md">
      <Typography variant="h1" className="text-3xl my-2 font-bold">
        Welcome to Chat Me App
      </Typography>
      <Typography variant="h3" className="text-xl my-2 font-bold">
        Choose a room or create a new one
      </Typography>
      <RoomPicker
        loading={loading}
        setLoading={setLoading}
        username={username}
        room={room}
        setRoom={setRoom}
        socket={socket}
        user={user}
        navigate={navigate}
        rooms={rooms}
      />

      <Button
        className="mt-2"
        color="indigo"
        variant="text"
        onClick={() => setOpen(!open)}
      >
        +New room
      </Button>
      <NewRoomForm
        open={open}
        setOpen={setOpen}
        loading={loading}
        user={user}
      />
    </div>
  );
};

export default Home;
