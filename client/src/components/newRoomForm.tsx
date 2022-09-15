import {
  Dialog,
  DialogHeader,
  DialogBody,
  Alert,
  Input,
  DialogFooter,
  Button,
} from "@material-tailwind/react";
import { ChangeEvent, Dispatch, SetStateAction, useState } from "react";
import { addNewRoom } from "../services/dataService";
import LoadingSpinner from "./micro/loadingSpinner";

const NewRoomForm = ({
  open,
  setOpen,
  loading,
  user,
}: {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  loading: boolean;
  user: any;
}) => {
  const [newRoom, setNewRoom] = useState<string>("");
  const [newRoomErr, setNewRoomErr] = useState(false);
  
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setNewRoom(value);
  };

  const handleNewRoom = () => {
    addNewRoom(newRoom, user.id).then((res) => {
      if (res?.status === 200) {
        setNewRoom("");
        window.location.reload();
      } else {
        setNewRoomErr(true);
      }
    });
  };

  return (
    <Dialog open={open} handler={() => setOpen(!open)}>
      {loading ? (
        <LoadingSpinner />
      ) : (
        <div>
          <DialogHeader>Name your new room</DialogHeader>
          <DialogBody>
            {newRoomErr && <Alert color="red">Couldn't add the room!</Alert>}
            <Input
              label="Name of your room"
              onChange={handleChange}
              value={newRoom}
            />
          </DialogBody>
          <DialogFooter>
            <Button
              variant="text"
              color="red"
              onClick={() => setOpen(!open)}
              className="mr-1"
            >
              <span>Cancel</span>
            </Button>
            <Button variant="filled" color="green" onClick={handleNewRoom}>
              <span>Confirm</span>
            </Button>
          </DialogFooter>
        </div>
      )}
    </Dialog>
  );
};

export default NewRoomForm;
