import axios from "axios";
import {
  sqlDataConfig,
  postMethodConfig,
  insertDataConfig,
} from "../db/dbHelper";
import { User } from "./userModel";
import bcrypt from "bcrypt";
import { Request } from "express";
import { generateUniqueId } from "../utils/generateId";

const dbUrl = process.env.HARPERDB_URL;
const dbAPI = process.env.HARPERDB_API;
const BCRYPT_SALT_ROUNDS = 12;

const registerUserService = async (req: Request) => {
  try {
    if (!dbUrl || !dbAPI) return null;

    const response = await bcrypt
      .hash(req.body.password, BCRYPT_SALT_ROUNDS)
      .then((hashedPassword) => {
        const user: User = {
          id: generateUniqueId(),
          username: req.body.username,
          password: hashedPassword,
          room: "main",
        };

        const userData = insertDataConfig(user, "users");
        const userConfig = postMethodConfig(dbUrl, dbAPI, userData);

        axios(userConfig)
          .then((res) => {
            console.log("user created");
            return true;
          })
          .catch((err) => {
            console.log(err);
            return false;
          });
      })
      .catch((err) => {
        console.log(err);
        return false;
      });

    const getResponse = async () => {
      return response;
    };

    console.log(await getResponse());

    return await getResponse();
  } catch (err) {
    console.log(err);
  }
};

const userExists = async (req: Request) => {
  try {
    if (!dbUrl || !dbAPI) return null;

    const data = sqlDataConfig(
      `SELECT * FROM realtime_chat_app.users WHERE username = '${req.body.username}'`
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

    console.log(await getResponse());

    return getResponse();
  } catch (err) {
    console.log(err);
  }
};

const loginUserService = async (req: Request) => {
  const { username, password } = req.body;

  try {
    if (!dbUrl || !dbAPI) return null;
    const user = getUser(username, password);
    // if(!user.username)

  } catch (err) {}
};

const getUser = async (username: string, password: string) => {
  try {
    if (!dbUrl || !dbAPI) return null;
    const data = sqlDataConfig(
      `SELECT * FROM realtime_chat_app.users WHERE username = '${username}'`
    );

    const config = postMethodConfig(dbUrl, dbAPI, data);
    const response: any = await axios(config).then((res) => {
      return res.data[0];
    }).catch((err) => {
      return err;
    });

    const getResponse = () => {
      return response;
    };

    return getResponse();
  } catch (err) {
    return err;
  }
};

export { registerUserService, userExists };
