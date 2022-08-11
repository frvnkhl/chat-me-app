import { Server, Socket } from "socket.io";
import { Message } from "./message/messageModel";
import { harperSaveMessage } from "./message/messageService";
import { User } from "./user/userModel";
const chatBot = "Chat Bot";
let chatRoom: string;
let allUsers: User[] = [];

class Connection {
  constructor(io: Server, socket: Socket) {
    this.socket = socket;
    this.io = io;

    socket.on("joinRoom", (data: { username: string; room: string }) => {
      const { username, room } = data;
      socket.join(room);
      console.log({ data: data });

      let createdTime = Date.now();
      socket.to(room).emit("receiveMessage", {
        message: `${username} has joined the chat`,
        username: chatBot,
        createdTime,
        room: room,
      });
      console.log("sent message");

      socket.emit("receiveMessage", {
        message: `Welcome ${username}`,
        username: chatBot,
        createdTime,
        room: room,
      });

      chatRoom = room;
      allUsers.push({ id: socket.id, username, room });
      console.log("got till the end");

      const chatRoomUsers = allUsers.filter((user) => user.room === room);
      socket.to(room).emit("chatRoomUsers", chatRoomUsers);
      socket.emit("chatRoomUsers", chatRoomUsers);
    });

    socket.on("sendMessage", (data: Message) => {
      console.log('triggered send message socket');
      io.in(data.room).emit("receiveMessage", data);
      
      console.log('emitted');
      harperSaveMessage(data)
        ?.then((res) => console.log(res))
        .catch((err) => console.log(err));
    });
  }

  socket: Socket;
  io: Server;
}

const chat = (io: Server) => {
  io.on("connection", (socket: Socket) => {
    new Connection(io, socket);
  });
};

export { chat };
