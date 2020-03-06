import { DEFAULT_SOCKETURL } from "./../constants/config";
const io = require("socket.io-client");
const socket = io(DEFAULT_SOCKETURL);

export default socket;
