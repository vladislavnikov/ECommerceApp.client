import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchSignIn, fetchSignUp } from "src/api/services/userService";

interface UserState {
  currentUser: string | null;
  loading: boolean;
  error: string | null;
}

interface AuthPayload {
  username: string;
  password: string;
}

const initialState: UserState = {
  currentUser: localStorage.getItem("currentUser") || null,
  loading: false,
  error: null,
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

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout(state) {
      return { ...state, currentUser: null };
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
      }));
  },
});

export const UserActions = {
  ...userSlice.actions,
  handleSignIn,
  handleSignUp,
};

export default userSlice.reducer;
