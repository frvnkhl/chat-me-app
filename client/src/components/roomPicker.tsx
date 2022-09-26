import LoadingSpinner from "./micro/loadingSpinner";
import { ReactComponent as RubbishBin } from "../img/icons/delete-icon.svg";
import { Button } from "@material-tailwind/react";
import { Dispatch, SetStateAction, SyntheticEvent, useEffect } from "react";
import { deleteRoom } from "../services/dataService";
import { Socket } from "socket.io-client";
import { NavigateFunction } from "react-router";
import { Room } from "../models/Room";

const RoomPicker = ({
  setLoading,
  username,
  setRoom,
  socket,
  user,
  navigate,
  rooms,
}: {
  setLoading: Dispatch<SetStateAction<boolean>>;
  username: string;
  setRoom: Dispatch<SetStateAction<string>>;
  socket: Socket;
  user: any;
  navigate: NavigateFunction;
  rooms: Room[];
}) => {
  const handleEnterChat = async (event: SyntheticEvent, roomId: string) => {
    setLoading(true);
    setRoom(roomId);
    if (username !== "" && roomId !== "") {
      socket.emit("joinRoom", { username, room: roomId });
      navigate("/chat", { replace: true });
    }
  };

  const handleRoomDelete = (roomId: string) => {
    deleteRoom(roomId, user.id)
      .then((res) => {
        if (res?.status === 200) {
          window.location.reload();
        }
      })
      .catch((err) => {
        console.log({ roomDeleteErr: err });
      });
  };

  return (
    <div className="md:divide-solid md:divide-x divide-gray-400">
      {user ? (
        <>
          {rooms.map((room) =>
            room.admin === user.id ? (
              <div className="inline-flex" key={room.id}>
                <Button
                  variant="text"
                  color="indigo"
                  onClick={(event) => handleEnterChat(event, room.id)}
                  key={room.id}
                  className="inline-block pr-3 font-display"
                >{`#${room.name}`}</Button>
                <Button
                  variant="text"
                  color="red"
                  className="inline-block px-3"
                  onClick={() => handleRoomDelete(room.id)}
                >
                  <RubbishBin className="h-4 fill-red-900" />
                </Button>
              </div>
            ) : (
              <div className="inline-flex" key={room.id}>
                <Button
                  variant="text"
                  color="indigo"
                  onClick={(event) => handleEnterChat(event, room.id)}
                  key={room.id}
                  className="font-display"
                >{`#${room.name}`}</Button>
              </div>
            )
          )}
        </>
      ) : (
        <LoadingSpinner />
      )}
    </div>
  );
};

export default RoomPicker;
