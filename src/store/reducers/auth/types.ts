import { IUser } from "../../../models/IUser";

export interface AuthState {
  isAuth: boolean;
  user: IUser;
  isLoading: boolean;
  error: string;
}
export enum AuthActionEnum {
  SET_AUTH = "SET_AUTH",
  SET_ERROR = "SET_ERROR",
  SET_USER = "SET_USER",
  SET_IS_LOADING = "SET_IS_LOADING",
}
export interface SetAuthState {
  type: AuthActionEnum.SET_AUTH;
  payload: boolean;
}
export interface SetErrorState {
  type: AuthActionEnum.SET_ERROR;
  payload: string;
}
export interface SetUserState {
  type: AuthActionEnum.SET_USER;
  payload: IUser;
}
export interface SetIsLoadingState {
  type: AuthActionEnum.SET_IS_LOADING;
  payload: boolean;
}
export type AuthAction =
  | SetAuthState
  | SetErrorState
  | SetUserState
  | SetIsLoadingState;
