export interface RegistrationState {
  regFormLoading: boolean;
  regFormError: string;
}
export enum RegistrationActionEnum {
  SET_REG_ERROR = "SET_REG_ERROR",
  SET_REG_IS_LOADING = "SET_REG_IS_LOADING",
}
export interface SetRegErrorState {
  type: RegistrationActionEnum.SET_REG_ERROR;
  payload: string;
}
export interface SetRegIsLoadingState {
  type: RegistrationActionEnum.SET_REG_IS_LOADING;
  payload: boolean;
}
export type RegistrationAction = SetRegErrorState | SetRegIsLoadingState;
