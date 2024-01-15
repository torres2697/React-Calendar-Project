import { AuthActionCreators } from "./auth/action-creators";
import { EventActionCreators } from "./event/action-creators";
import { RegistrationActionCreators } from "./registration/action-creators";

export const AllActionCreators = {
  ...AuthActionCreators,
  ...RegistrationActionCreators,
  ...EventActionCreators,
};
