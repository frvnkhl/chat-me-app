import LoadingSpinner from "./micro/loadingSpinner";
import { ReactComponent as RubbishBin } from "../img/icons/delete-icon.svg";
import { Button } from "@material-tailwind/react";
import { Dispatch, SetStateAction, SyntheticEvent } from "react";
import { deleteRoom } from "../services/dataService";
import { Socket } from "socket.io-client";
import { NavigateFunction } from "react-router";

const RoomPicker = ({
  loading,
  setLoading,
  username,
  room,
  setRoom,
  socket,
  user,
  navigate,
  rooms,
}: {
  loading: boolean;
  setLoading: Dispatch<SetStateAction<boolean>>;
  username: string;
  room: string;
  setRoom: Dispatch<SetStateAction<string>>;
  socket: Socket;
  user: any;
  navigate: NavigateFunction;
  rooms: any[]
}) => {
  const handleEnterChat = async (event: SyntheticEvent, roomId: string) => {
    setLoading(true);
    const input = event.target as HTMLElement;
    const innerText = input.innerText;
    const formattedInput = innerText.replace("#", "").toLowerCase();
    console.log({ click: formattedInput });
    console.log({ username: username, room: room });
    setRoom(roomId);
    if (username !== "" && roomId !== "") {
      console.log({ user: username, room: room, roomId: roomId });

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
    <>
      {loading ? (
        <LoadingSpinner />
      ) : (
        <div className="divide-solid divide-x divide-gray-400">
          {rooms.map((room) =>
            room.admin === user.id ? (
              <div className="inline-flex" key={room.id}>
                <Button
                  variant="text"
                  color="indigo"
                  onClick={(event) => handleEnterChat(event, room.id)}
                  key={room.id}
                  className="inline-block pr-3"
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
                >{`#${room.name}`}</Button>
              </div>
            )
          )}
        </div>
      )}
    </>
  );
};

export default RoomPicker;
