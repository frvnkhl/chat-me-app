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
      Authorization: dbAPI,
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

export { harperSaveMessage };
