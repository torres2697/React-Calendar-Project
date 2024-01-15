import {
  RegistrationAction,
  RegistrationActionEnum,
  RegistrationState,
} from "./types";

const initialState: RegistrationState = {
  regFormLoading: false,
  regFormError: "",
};

export default function registrationReducer(
  state = initialState,
  action: RegistrationAction
): RegistrationState {
  switch (action.type) {
    case RegistrationActionEnum.SET_REG_ERROR:
      return { ...state, regFormError: action.payload, regFormLoading: false };
    case RegistrationActionEnum.SET_REG_IS_LOADING:
      return { ...state, regFormLoading: action.payload };
    default:
      return state;
  }
}
