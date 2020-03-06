import { DEFAULT_SOCKETURL } from "./../constants/config";
const io = require("socket.io-client");
const socketIo = io(DEFAULT_SOCKETURL);

export default socketIo;
