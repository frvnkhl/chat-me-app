import axios from "axios";
import {
  insertDataConfig,
  postMethodConfig,
  sqlDataConfig,
} from "../db/dbHelper";
import { generateUniqueId } from "../utils/generateId";
import { Room } from "./roomModel";

const dbUrl = process.env.HARPERDB_URL;
const dbAPI = process.env.HARPERDB_API;

const roomExists = async (name: string) => {
  try {
    if (!dbUrl || !dbAPI) return null;

    const data = sqlDataConfig(
      `SELECT * FROM realtime_chat_app.rooms WHERE name = '${name}'`
    );

    const config = postMethodConfig(dbUrl, dbAPI, data);

    const response: any = await axios(config)
      .then((res) => {
        if (res.data.length !== 0) {
          return true;
        }
        return false;
      })
      .catch((err) => {
        console.log(err);
      });

    const getResponse = async () => {
      return await response;
    };

    return getResponse();
  } catch (err) {
    console.log(err);
  }
};

const createNewRoomService = async (name: string, admin: string) => {
  try {
    if (!dbUrl || !dbAPI) return null;

    const room: Room = {
      id: generateUniqueId(),
      name: name,
      admin: admin,
    };

    const roomData = insertDataConfig(room, "rooms");
    const roomConfig = postMethodConfig(dbUrl, dbAPI, roomData);

    const response = await axios(roomConfig)
      .then((res) => {
        console.log("Room created");
        return true;
      })
      .catch((err) => {
        console.log(err);
        return false;
      });

    const getResponse = async () => {
      return response;
    };

    return await getResponse();
  } catch (err) {
    return false;
  }
};

const getRoom = async (roomId: string) => {
  try {
    if (!dbUrl || !dbAPI) return null;
    const data = sqlDataConfig(
      `SELECT * FROM realtime_chat_app.rooms WHERE id = '${roomId}'`
    );

    const config = postMethodConfig(dbUrl, dbAPI, data);
    const response: any = await axios(config)
      .then((res) => {
        return res.data[0];
      })
      .catch((err) => {
        return err;
      });

    const getResponse = async () => {
      return await response;
    };

    return await getResponse();
  } catch (err) {
    return err;
  }
};

const getAllRooms = async () => {
    try {
    if (!dbUrl || !dbAPI) return null;
    const data = sqlDataConfig(
      'SELECT * FROM realtime_chat_app.rooms'
    );

    const config = postMethodConfig(dbUrl, dbAPI, data);
    const response: any = await axios(config)
      .then((res) => {
        return res.data;
      })
      .catch((err) => {
        return err;
      });

    const getResponse = async () => {
      return await response;
    };

    return await getResponse();
  } catch (err) {
    return err;
  };
};


const deleteRoomService = async (roomId: string) => {
  try {
    if (!dbUrl || !dbAPI) return null;
    const data = sqlDataConfig(
      `DELETE FROM realtime_chat_app.rooms WHERE id = '${roomId}'`
    );
    const config = postMethodConfig(dbUrl, dbAPI, data);
    const response: boolean = await axios(config)
      .then((res) => {
        return true;
      })
      .catch((err) => {
        return false;
      });

    const getResponse = async () => {
      return await response;
    };

    return await getResponse();
  } catch (err) {
    return false;
  }
};

export { roomExists, createNewRoomService, getRoom, deleteRoomService, getAllRooms };