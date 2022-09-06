import { server } from "../helpers/axios";
import apiURL from "./apiURL";
import { authHeader } from "./authHeader";
const header = authHeader();

const getCurrentUser = async () => {
  if (header && header.Authorization) {
    return server.get(`${apiURL}/api/user/current`, {
      withCredentials: true,
      headers: header,
    });
  }
};

export { getCurrentUser };