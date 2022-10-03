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
  user,
}: {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  user: any;
}) => {
  const [newRoom, setNewRoom] = useState<string>("");
  const [newRoomErr, setNewRoomErr] = useState({
    error: false,
    message: "",
  });
  const [formLoading, setFormLoading] = useState(false);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setNewRoom(value);
  };

  const handleNewRoom = () => {
    setFormLoading(true);
    addNewRoom(newRoom, user.id)
      .then((res) => {
        if (res?.status === 200) {
          setNewRoom("");
          window.location.reload();
        }
      })
      .catch((err) => {
        setNewRoomErr({
          error: true,
          message: err.response.data.message,
        });
        setFormLoading(false);
        console.log({ err: newRoomErr });
      });
  };

  return (
    <Dialog open={open} handler={() => setOpen(!open)} className='min-w-full md:min-w-fit'>
      {formLoading ? (
        <LoadingSpinner />
      ) : (
        <div>
          <DialogHeader>Name your new room</DialogHeader>
          <DialogBody className="block">
            {newRoomErr.error && (
              <Alert color="red" className="mb-4 font-semibold">
                {newRoomErr.message}
              </Alert>
            )}
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
