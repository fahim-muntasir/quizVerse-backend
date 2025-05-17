import dotenv from "dotenv";
dotenv.config();
import http from "http";
import app from "./src/app/app";
import { dbConnection } from "./src/db/dbConnection";
import { initializeSocket, getIo } from "./src/socket/socket";

const server = http.createServer(app);

// initialize socket
initializeSocket(server);

const PORT = process.env.PORT || 4000;

// server will run after connect db
dbConnection()
  .then(() => {
    server.listen(PORT, () => console.log(`Server is running on ${PORT} port`));
  })
  .catch((err: unknown) => console.log(err));
