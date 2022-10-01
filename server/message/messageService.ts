import axios from "axios";
import { Message } from "./messageModel";
import {
  insertDataConfig,
  postMethodConfig,
  sqlDataConfig,
} from "../db/dbHelper";
import * as dotenv from "dotenv";
dotenv.config();

const dbUrl = process.env.HARPERDB_URL;
const dbAPI = process.env.HARPERDB_API;

//Save messages to harper DB
const harperSaveMessage = (message: Message) => {
  console.log({ url: dbUrl, api: dbAPI });

  if (!dbUrl || !dbAPI) return null;

  const data = insertDataConfig(message, "messages");
  const config = postMethodConfig(dbUrl, dbAPI, data);

  return new Promise((resolve, reject) => {
    axios(config)
      .then((response) => {
        resolve(JSON.stringify(response.data));
      })
      .catch((error) => {
        reject(error);
      });
  });
};

const harperGetMessages = (room: string) => {
  if (!dbUrl || !dbAPI) return null;

  const data = sqlDataConfig(
    `SELECT * FROM realtime_chat_app.messages WHERE room = '${room}' LIMIT 100`
  );

  const config = postMethodConfig(dbUrl, dbAPI, data);

  return new Promise((resolve, reject) => {
    axios(config)
      .then((res) => {
        resolve(JSON.stringify(res.data));
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export { harperSaveMessage, harperGetMessages };
