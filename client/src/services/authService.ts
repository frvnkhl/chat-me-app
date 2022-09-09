import { server } from "../helpers/axios";
import apiURL from "./apiURL";

const registerUser = async (userData: {
  username: string;
  password: string;
}) => {
  return await server.post(
    `${apiURL}/api/user/register`,
    userData,
    {
      withCredentials: true,
    }
  );
};

const loginUser = async (userData: { username: string; password: string }) => {
  return await server
    .post(`${apiURL}/api/user/login`, userData, {
      withCredentials: true,
    })
    .then((res) => {
      if (res.data.token) {
        localStorage.setItem("token", JSON.stringify(res.data.token));
      }
      return res.data;
    });
};

const logoutUser = async () => {
  localStorage.removeItem("token");
};

export { registerUser, loginUser, logoutUser };