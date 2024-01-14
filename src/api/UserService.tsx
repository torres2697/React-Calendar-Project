import axios, { Axios, AxiosResponse } from "axios";
import { IUser } from "../models/IUser";

export default class UserService {
  static async getUsers(): Promise<IUser[]> {
    const { data: fileUsers } = await axios.get<IUser[]>(
      "/React-Calendar-Project/users.json"
    );
    const localStorageUsers = localStorage.getItem("localUsers") || "[]";
    const parsedLsUsers = JSON.parse(localStorageUsers) as IUser[];
    return [...fileUsers, ...parsedLsUsers];
  }
  static createUser(username: string, password: string): void {
    const localStorageUsers = localStorage.getItem("localUsers") || "[]";
    const parsedLsUsers = JSON.parse(localStorageUsers) as IUser[];
    const newUser = { username, password };
    localStorage.setItem(
      "localUsers",
      JSON.stringify([...parsedLsUsers, newUser])
    );
  }
}

// export const getUsers = async () => {
//   const response = await axios.get<IUser[]>("./users.json");
//   return response;
// };
