import axios from "axios";
import { DEFAULT_APIURL } from "./../constants/config";

const instance = axios.create({
  baseURL: DEFAULT_APIURL
});

export default instance;
