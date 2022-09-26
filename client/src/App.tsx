import { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import io from "socket.io-client";
import Chat from "./pages/Chat";
import Auth from "./pages/Auth";
import ProtectedRoute from "./components/privateRoute/protectedRoute";
import { User } from "./models/User";

const socket = io("http://localhost:6299");

const App = () => {
  const [username, setUsername] = useState<string>("");
  const [room, setRoom] = useState<string>("");
  const [user, setUser] = useState<User>();
  const retrievedUser = localStorage.getItem("user");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (retrievedUser !== null) {
      const user = JSON.parse(retrievedUser);
      setUsername(user.username);
      setUser(user);
    }
  }, [retrievedUser]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ProtectedRoute />}>
          <Route
            path="/"
            element={
              <Home
                username={username}
                setRoom={setRoom}
                socket={socket}
                user={user}
                loading={loading}
                setLoading={setLoading}
              />
            }
          />
          <Route
            path="/chat"
            element={<Chat username={username} room={room} socket={socket} />}
          />
        </Route>
        <Route path="/auth" element={<Auth />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
