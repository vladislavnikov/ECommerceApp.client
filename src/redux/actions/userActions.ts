import { Dispatch } from "redux";
import { fetchSignIn, fetchSignUp } from "src/api/services/userService";

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

export const login = (username: string): LoginAction => ({
  type: UserActionTypes.LOGIN,
  payload: username,
});

export const logout = (): LogoutAction => ({
  type: UserActionTypes.LOGOUT,
});

export const handleSignIn =
  (username: string, password: string) =>
  async (dispatch: Dispatch<UserActions>): Promise<void> => {
    try {
      await fetchSignIn(username, password);
      dispatch(login(username));
    } catch (error) {
      console.error("SignIn failed:", error);
      throw new Error("Failed to sign in. Please check your credentials.");
    }
  };

export const handleSignUp =
  (username: string, password: string) =>
  async (dispatch: Dispatch<UserActions>): Promise<void> => {
    try {
      await fetchSignUp(username, password);
      dispatch(login(username));
    } catch (error) {
      console.error("SignUp failed:", error);
      throw new Error("Failed to sign up. Please try again.");
    }
  };
