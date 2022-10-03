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
import { Room } from "../models/Room";
import Nav from "../components/nav";

const Home = ({
  username,
  setRoom,
  socket,
  user,
  loading,
  setLoading,
}: {
  username: string;
  setRoom: Dispatch<SetStateAction<string>>;
  socket: Socket;
  user: any;
  loading: boolean;
  setLoading: Dispatch<SetStateAction<boolean>>;
}) => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [rooms, setRooms] = useState<Array<Room>>([]);

  const fetchRooms = useCallback(() => {
    getAllRooms()
      .then((res) => {
        setRooms(res?.data.rooms);
        if (rooms) {
          setLoading(false);
        }
      })
      .catch((err) => {
        console.log({ error: err });
        setLoading(false);
      });
  }, [setLoading]);

  useEffect(() => {
    fetchRooms();
  }, [fetchRooms]);

  return (
    <>
      <Nav />
      <div className="container mt-10 mx-auto max-w-screen-xl text-center bg-[#eeeeee] border-[1px] border-white rounded-2xl p-3 shadow-md">
        <Typography variant="h1" className="text-3xl my-2 font-display">
          Welcome to Chat Me App
        </Typography>
        <Typography variant="h3" className="text-xl my-2 font-bold">
          Choose a room or create a new one
        </Typography>
        {!rooms || loading ? (
          <LoadingSpinner />
        ) : (
          <RoomPicker
            setLoading={setLoading}
            username={username}
            setRoom={setRoom}
            socket={socket}
            user={user}
            navigate={navigate}
            rooms={rooms}
          />
        )}

        <Button
          className="mt-2 font-display"
          color="indigo"
          variant="text"
          onClick={() => setOpen(!open)}
        >
          +New room
        </Button>
      </div>
        <NewRoomForm open={open} setOpen={setOpen} user={user} />
    </>
  );
};

export default Home;
