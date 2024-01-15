import axios from "axios";
import { AppDispatch } from "../..";
import UserService from "../../../api/UserService";
import { IUser } from "../../../models/IUser";
import {
  AuthActionEnum,
  SetAuthState,
  SetErrorState,
  SetIsLoadingState,
  SetUserState,
} from "./types";

export const AuthActionCreators = {
  setAuth: (auth: boolean): SetAuthState => ({
    type: AuthActionEnum.SET_AUTH,
    payload: auth,
  }),
  setError: (error: string): SetErrorState => ({
    type: AuthActionEnum.SET_ERROR,
    payload: error,
  }),
  setIsLoading: (isLoading: boolean): SetIsLoadingState => ({
    type: AuthActionEnum.SET_IS_LOADING,
    payload: isLoading,
  }),
  setUser: (user: IUser): SetUserState => ({
    type: AuthActionEnum.SET_USER,
    payload: user,
  }),
  login:
    (username: string, password: string, clearLoginFormFields: () => void) =>
    async (dispatch: AppDispatch) => {
      try {
        dispatch(AuthActionCreators.setIsLoading(true));
        setTimeout(async () => {
          const users = await UserService.getUsers();
          const mockUser = users.find(
            (user) => user.username === username && user.password === password
          );
          if (mockUser) {
            localStorage.setItem("auth", "true");
            localStorage.setItem("username", mockUser.username);
            dispatch(AuthActionCreators.setUser(mockUser));
            dispatch(AuthActionCreators.setAuth(true));
            dispatch(AuthActionCreators.setError(""));
            dispatch(AuthActionCreators.setIsLoading(false));
          } else {
            dispatch(
              AuthActionCreators.setError(
                "Wrong login or password! Please, try again!"
              )
            );
          }
          clearLoginFormFields();
        }, 1000);
      } catch (e) {
        dispatch(AuthActionCreators.setError("Authorization Error!"));
      }
    },
  logout: () => async (dispatch: AppDispatch) => {
    localStorage.removeItem("auth");
    localStorage.removeItem("username");
    dispatch(AuthActionCreators.setAuth(false));
    dispatch(AuthActionCreators.setUser({} as IUser));
  },
};
