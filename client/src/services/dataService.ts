import { server } from "../helpers/axios";
import { authHeader } from "./authHeader";

const getCurrentUser = async () => {
  const header = authHeader();
  if (header && header.Authorization) {
    return await server.get('/api/user/current', {
      withCredentials: true,
      headers: header,
    });
  }
};

const getAllRooms = async () => {
  const header = authHeader();
  if (header && header.Authorization) {
    // console.log({header: header});
    
    return await server.get('/api/room/all', {
      withCredentials: true,
      headers: header,
    });
  }
};

const addNewRoom = async (name: string, admin: string) => {
  const header = authHeader();
  if (header && header.Authorization) {
    return await server.post(
      '/api/room/new',
      { name, admin },
      {
        withCredentials: true,
        headers: header,
      }
    );
  }
};

const deleteRoom = async (roomId: string, userId: string) => {
  const header = authHeader();
  if (header && header.Authorization) {
    return await server.delete(`/api/room/${roomId}`, {
      data: { userId },
      withCredentials: true,
      headers: header,
    });
  }
};

const getRoom = async (roomId: string) => {
  const header = authHeader();
  if (header && header.Authorization) {
    return server.get(`/api/room/${roomId}`, {
      withCredentials: true,
      headers: header,
    });
  }
};

export { getCurrentUser, getAllRooms, addNewRoom, deleteRoom, getRoom };
