import http from "http";
import axios from "axios";
import { BASE_PATH } from "../../config";

axios.defaults.baseURL = BASE_PATH;
axios.defaults.httpAgent = new http.Agent({ keepAlive: true });
axios.defaults.timeout = 3000;

export async function LoginUser(userData) {
  try {
    const result = await axios.post("/users/login/", userData);
  } catch (err) {}
}

export async function GetUser(userID) {
  const url = "/users/" + userID;
  try {
    const result = await axios.get(url);

    return result;
  } catch (err) {
    return err;
  }
}
