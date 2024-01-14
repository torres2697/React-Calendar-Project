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
    (username: string, password: string, clearField: () => void) =>
    async (dispatch: AppDispatch) => {
      try {
        dispatch(AuthActionCreators.setIsLoading(true));
        setTimeout(async () => {
          const users = await UserService.getUsers();
          const mockUser = users.find(
            (user) => user.username === username && user.password === password
          );
          console.log(users);
          if (mockUser) {
            localStorage.setItem("auth", "true");
            localStorage.setItem("username", mockUser.username);
            dispatch(AuthActionCreators.setUser(mockUser));
            dispatch(AuthActionCreators.setAuth(true));
            dispatch(AuthActionCreators.setError(""));
          } else {
            dispatch(
              AuthActionCreators.setError(
                "Wrong login or password! Please, try again!"
              )
            );
          }
          dispatch(AuthActionCreators.setIsLoading(false));
        }, 1000);
      } catch (e) {
        dispatch(AuthActionCreators.setError("Authorization Error!"));
      } finally {
        clearField();
      }
    },
  logout: () => async (dispatch: AppDispatch) => {
    localStorage.removeItem("auth");
    localStorage.removeItem("username");
    dispatch(AuthActionCreators.setAuth(false));
    dispatch(AuthActionCreators.setUser({} as IUser));
  },
  register:
    (
      username: string,
      password: string,
      passwordRepeat: string,
      onSucessfulRegister: () => void
    ) =>
    async (dispatch: AppDispatch) => {
      try {
        dispatch(AuthActionCreators.setIsLoading(true));
        setTimeout(async () => {
          if (password !== passwordRepeat) {
            dispatch(
              AuthActionCreators.setError(
                "Passwords do not match, please try again!"
              )
            );
          } else {
            const users = await UserService.getUsers();
            const mockUser = users.find((user) => user.username === username);
            if (mockUser) {
              dispatch(
                AuthActionCreators.setError("This user is already registered!")
              );
            } else {
              UserService.createUser(username, password);
              console.log(users);
              onSucessfulRegister();
              // dispatch(AuthActionCreators.setError(""));
            }
            dispatch(AuthActionCreators.setIsLoading(false));
          }
        }, 1000);
      } catch (e) {
        dispatch(AuthActionCreators.setError("Registration Error!"));
      }
    },
};
