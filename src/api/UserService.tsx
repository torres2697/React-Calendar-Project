import axios, { Axios, AxiosResponse } from "axios";
import { IUser } from "../models/IUser";

export default class UserService {
  static async getUsers(): Promise<AxiosResponse<IUser[]>> {
    return axios.get<IUser[]>("./users.json");
  }
}

// export const getUsers = async () => {
//   const response = await axios.get<IUser[]>("./users.json");
//   return response;
// };
