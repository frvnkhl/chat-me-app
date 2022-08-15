import axios from "axios";
import { Message } from "./messageModel";
import * as dotenv from "dotenv";
dotenv.config();

const dbUrl = process.env.HARPERDB_URL;
const dbAPI = process.env.HARPERDB_API;

//Save messages to harper DB
const harperSaveMessage = (message: Message) => {
  console.log({ url: dbUrl, api: dbAPI });

  if (!dbUrl || !dbAPI) return null;

  console.log("got passed the initial condition");

  const data = JSON.stringify({
    operation: "insert",
    schema: "realtime_chat_app",
    table: "messages",
    records: [message],
  });

  console.log({ data: data });

  const config = {
    method: "post",
    url: dbUrl,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Basic ${dbAPI}`,
    },
    data: data,
  };

  console.log({ config: config });

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

  const data = JSON.stringify({
    operation: "sql",
    sql: `SELECT * FROM realtime_chat_app.messages WHERE room = '${room}' LIMIT 100`,
  });

  const config = {
    method: "post",
    url: dbUrl,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Basic ${dbAPI}`,
    },
    data: data,
  };

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