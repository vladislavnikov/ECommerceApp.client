export enum UserActionTypes {
  LOGIN = "LOGIN",
  LOGOUT = "LOGOUT",
}

export interface LoginAction {
  type: UserActionTypes.LOGIN;
  payload: string;
}

export interface LogoutAction {
  type: UserActionTypes.LOGOUT;
}

export type UserActions = LoginAction | LogoutAction;
