import express, { Express, Request, Response } from "express";
import * as dotenv from "dotenv";
import { Server } from "socket.io";
import { chat } from "./chat";
import http from 'http';
dotenv.config();

const app: Express = express();
const port = process.env.PORT || 6299;

app.get("/", (req: Request, res: Response) => {
  res.send("Trying out");
});

const httpServer = http.createServer(app);

const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:3000",
    credentials: true,
  },
});
chat(io);


httpServer.listen(port, () => {
  console.log(`Server running on port ${port}`);
});