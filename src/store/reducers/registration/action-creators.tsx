import { FormInstance } from "antd";
import { AppDispatch } from "../..";
import UserService from "../../../api/UserService";
import {
  RegistrationActionEnum,
  SetRegErrorState,
  SetRegIsLoadingState,
} from "./types";

export const RegistrationActionCreators = {
  setRegError: (error: string): SetRegErrorState => ({
    type: RegistrationActionEnum.SET_REG_ERROR,
    payload: error,
  }),
  setRegIsLoading: (isLoading: boolean): SetRegIsLoadingState => ({
    type: RegistrationActionEnum.SET_REG_IS_LOADING,
    payload: isLoading,
  }),
  register:
    (
      username: string,
      password: string,
      passwordRepeat: string,
      onSucessfulRegister: () => void,
      // clearRegisterFormFields: () => void,
      form: FormInstance<any>
    ) =>
    async (dispatch: AppDispatch) => {
      try {
        dispatch(RegistrationActionCreators.setRegIsLoading(true));
        setTimeout(async () => {
          if (password !== passwordRepeat) {
            dispatch(
              RegistrationActionCreators.setRegError(
                "Passwords do not match, please try again!"
              )
            );
            form.setFieldsValue({ password: "", passwordConfirm: "" });
          } else {
            const users = await UserService.getUsers();
            const mockUser = users.find((user) => user.username === username);
            if (mockUser) {
              dispatch(
                RegistrationActionCreators.setRegError(
                  "User with this login is already registered!"
                )
              );
            } else {
              UserService.createUser(username, password);
              dispatch(RegistrationActionCreators.setRegError(""));
              dispatch(RegistrationActionCreators.setRegIsLoading(false));
              onSucessfulRegister();
            }
            form.setFieldsValue({
              username: "",
              password: "",
              passwordConfirm: "",
            });
            // clearRegisterFormFields();
          }
        }, 1000);
      } catch (e) {
        dispatch(RegistrationActionCreators.setRegError("Registration Error!"));
      }
    },
};
