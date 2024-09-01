// src/socket.js
import { io } from "socket.io-client";

const SOCKET_SERVER_URL = "http://localhost:8000"; // Your server URL

const socket = io(SOCKET_SERVER_URL, {
  transports: ["websocket"],
  // Additional options if needed
});

export default socket;
