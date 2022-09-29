import { server } from "../helpers/axios";

//API call to register a user
const registerUser = async (userData: {
  username: string;
  password: string;
}) => {
  return await server.post("/api/user/register", userData, {
    withCredentials: true,
  });
};

//API call to login user
const loginUser = async (userData: { username: string; password: string }) => {
  return await server
    .post("/api/user/login", userData, {
      withCredentials: true,
    })
    .then((res) => {
      if (res.data.token) {
        const parsedToken = res.data.token;
        localStorage.setItem("token", parsedToken);
        // console.log({setToken: localStorage.getItem('token')});
      }
      return res.data;
    });
};

//logout user
const logoutUser = async () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  window.location.reload();
};

export { registerUser, loginUser, logoutUser };
