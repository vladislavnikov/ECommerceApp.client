import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchSignIn, fetchSignUp, changePassword } from "src/api/services/userService";
import { AuthPayload } from "@/shared/models/authPayload";

interface UserState {
  currentUser: string | null;
  loading: boolean;
  error: string | null;
  successMessage: string | null;
}

const initialState: UserState = {
  currentUser: localStorage.getItem("currentUser") || null,
  loading: false,
  error: null,
  successMessage: null,
};

export const handleSignIn = createAsyncThunk("user/signIn", async ({ username, password }: AuthPayload) => {
  try {
    await fetchSignIn(username, password);
    return username;
  } catch (error) {
    console.error(error);
    throw new Error("Invalid credentials");
  }
});

export const handleSignUp = createAsyncThunk("user/signUp", async ({ username, password }: AuthPayload, { rejectWithValue }) => {
  try {
    await fetchSignUp(username, password);
    return username;
  } catch (error) {
    console.error(error);
    return rejectWithValue("Failed to sign up. Please check your credentials.");
  }
});

export const handleChangePassword = createAsyncThunk<
  { message: string },
  { newPassword: string; repeatNewPassword: string },
  { rejectValue: string }
>("user/changePassword", async ({ newPassword, repeatNewPassword }, { rejectWithValue }) => {
  try {
    const response = await changePassword(newPassword, repeatNewPassword);
    return response;
  } catch (error: unknown) {
    console.error(error);
    return rejectWithValue("Failed to change password.");
  }
});

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout(state) {
      return { ...state, currentUser: null };
    },
    updateUsername(state, action: PayloadAction<string>) {
      localStorage.setItem("currentUser", action.payload);
      return {
        ...state,
        currentUser: action.payload,
      };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(handleSignIn.pending, (state) => ({
        ...state,
        loading: true,
        error: null,
      }))
      .addCase(handleSignIn.fulfilled, (state, action: PayloadAction<string>) => ({
        ...state,
        loading: false,
        currentUser: action.payload,
      }))
      .addCase(handleSignIn.rejected, (state, action) => ({
        ...state,
        loading: false,
        error: action.payload as string,
      }))
      .addCase(handleSignUp.pending, (state) => ({
        ...state,
        loading: true,
        error: null,
      }))
      .addCase(handleSignUp.fulfilled, (state, action: PayloadAction<string>) => ({
        ...state,
        loading: false,
        currentUser: action.payload,
      }))
      .addCase(handleSignUp.rejected, (state, action) => ({
        ...state,
        loading: false,
        error: action.payload as string,
      }))
      .addCase(handleChangePassword.pending, (state) => ({
        ...state,
        loading: true,
        error: null,
        successMessage: null,
      }))
      .addCase(handleChangePassword.fulfilled, (state, action: PayloadAction<{ message: string }>) => ({
        ...state,
        loading: false,
        successMessage: action.payload.message,
        error: null,
      }))
      .addCase(handleChangePassword.rejected, (state, action) => ({
        ...state,
        loading: false,
        error: action.payload || "An unexpected error occurred.",
      }));
  },
});

export const UserAction = {
  ...userSlice.actions,
  handleSignIn,
  handleSignUp,
  handleChangePassword,
};

export default userSlice.reducer;
