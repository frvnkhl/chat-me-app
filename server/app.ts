import express, { Express, Request, Response } from "express";
import * as dotenv from "dotenv";
import { Server } from "socket.io";
import { chat } from "./chat";
import http from "http";
import * as userRoutes from "./user/userRoutes";
import * as roomRoutes from "./room/roomRoutes";
import * as bodyParser from "body-parser";
import cors from "cors";
dotenv.config();

const app: Express = express();
const port = process.env.PORT || 6299;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  cors({
    credentials: true,
    origin: process.env.CLIENT_URL,
    methods: "GET, POST, PATCH, DELETE",
  })
);
app.use("/api/user", userRoutes.router);
app.use("/api/room", roomRoutes.router);

const httpServer = http.createServer(app);

const io = new Server(httpServer, {
  cors: {
    origin: process.env.CLIENT_URL,
    credentials: true,
  },
});
chat(io);

httpServer.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
