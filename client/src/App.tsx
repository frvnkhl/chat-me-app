import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import io from "socket.io-client";
import Chat from "./pages/Chat";
import Auth from "./pages/Auth";
import ProtectedRoute from "./components/privateRoute/protectedRoute";

const socket = io("http://localhost:6299");

const App = () => {
  const [username, setUsername] = useState<string>("");
  const [room, setRoom] = useState<string>("");

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<ProtectedRoute/>}>
          <Route
            path="/"
            element={
              <Home
                username={username}
                setUsername={setUsername}
                room={room}
                setRoom={setRoom}
                socket={socket}
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
