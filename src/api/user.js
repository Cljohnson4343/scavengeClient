import http from "http";
import axios from "axios";

axios.defaults.baseURL = "http://localhost:4343/api/v0";
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
