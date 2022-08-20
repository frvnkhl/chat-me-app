import { Server, Socket } from "socket.io";
import { Message } from "./message/messageModel";
import { harperGetMessages, harperSaveMessage } from "./message/messageService";
import { User } from "./user/userModel";
import { leaveRoom } from "./utils/leaveRoom";
const chatBot = "Chat Bot";
let chatRoom: string;
let allUsers: User[] = [];

class Connection {
  constructor(io: Server, socket: Socket) {
    this.socket = socket;
    this.io = io;

    //pass userId instead of username
    socket.on("joinRoom", (data: { username: string; room: string }) => {
      const { username, room } = data;
      //get user
      socket.join(room);

      let createdTime = Date.now();
      socket.to(room).emit("receiveMessage", {
        message: `${username} has joined the chat`,
        username: chatBot,
        createdTime,
        room: room,
      });

      socket.emit("receiveMessage", {
        message: `Welcome ${username}`,
        username: chatBot,
        createdTime,
        room: room,
      });

      chatRoom = room;
      //change user room to the name of the room
      allUsers.push({ id: socket.id, username, room, password: 'lalala' });

      //filter users in the room through the db
      const chatRoomUsers = allUsers.filter((user) => user.room === room);
      socket.to(room).emit("chatRoomUsers", chatRoomUsers);
      socket.emit("chatRoomUsers", chatRoomUsers);

      harperGetMessages(room)
        ?.then((last100Messages) => {
          socket.emit("last100Messages", last100Messages);
        })
        .catch((err) => console.log(err));
    });

    socket.on("sendMessage", (data: Message) => {
      io.in(data.room).emit("receiveMessage", data);

      harperSaveMessage(data)
        ?.then((res) => console.log(res))
        .catch((err) => console.log(err));
    });

    socket.on(
      "leaveRoom",
      //pass id instead of username
      (data: { username: string; room: string; createdTime: Date }) => {
        const { username, room, createdTime } = data;
        //get user
        socket.leave(room);
        //change room to ''
        allUsers = leaveRoom(socket.id, allUsers);
        socket.to(room).emit("chatRoomUsers", allUsers);
        socket.to(room).emit("receiveMessage", {
          username: chatBot,
          message: `${username} left the chat`,
          createdTime,
        });
        console.log(`${username} left the chat`);
      }
    );

    socket.on("disconnect", () => {
      console.log("User disconnected from the chat");

      const user = allUsers.find((user) => user.id == socket.id);

      if (user?.username) {
        allUsers = leaveRoom(socket.id, allUsers);
        socket.to(chatRoom).emit("chatRoomUsers", allUsers);
        socket.to(chatRoom).emit("receiveMessage", {
          username: chatBot,
          message: `${user.username} has disconnected from the chat`,
          createdTime: new Date(),
        });
      }
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
