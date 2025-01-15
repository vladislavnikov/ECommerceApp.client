import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchSignIn, fetchSignUp, changePassword } from "src/api/services/userService";
import { AuthPayload } from "@/shared/models/authPayload";
import { UserProfile } from "@/shared/models/userProfile";

interface UserState {
  currentUser: UserProfile | null;
  loading: boolean;
  error: string | null;
  successMessage: string | null;
}

const initialState: UserState = {
  currentUser: (() => {
    const storedUser = localStorage.getItem("currentUser");
    if (storedUser) {
      try {
        return JSON.parse(storedUser) as UserProfile;
      } catch (e) {
        console.error("Failed to parse user from localStorage", e);
        localStorage.removeItem("currentUser");
      }
    }
    return null;
  })(),
  loading: false,
  error: null,
  successMessage: null,
};

export const handleSignIn = createAsyncThunk("user/signIn", async ({ username, password }: AuthPayload, { rejectWithValue }) => {
  try {
    await fetchSignIn({ username, password });

    const userProfile: UserProfile = {
      id: -1,
      username,
      firstName: "",
      lastName: "",
      email: "",
      description: "",
      phoneNumber: "",
      address: "",
      profileImage: "",
      cart: [],
    };

    localStorage.setItem("currentUser", JSON.stringify(userProfile));
    return userProfile;
  } catch (error) {
    console.error(error);
    return rejectWithValue("Invalid credentials");
  }
});

export const handleSignUp = createAsyncThunk("user/signUp", async ({ username, password }: AuthPayload, { rejectWithValue }) => {
  try {
    await fetchSignUp({ username, password });

    const userProfile: UserProfile = {
      id: -1,
      username,
      firstName: "",
      lastName: "",
      email: "",
      description: "",
      phoneNumber: "",
      address: "",
      profileImage: "",
      cart: [],
    };

    localStorage.setItem("currentUser", JSON.stringify(userProfile));
    return userProfile;
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

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout(state) {
      localStorage.removeItem("currentUser");
      return { ...state, currentUser: null };
    },
    updateUserProfile(state, action: PayloadAction<UserProfile | null>) {
      localStorage.setItem("currentUser", JSON.stringify(action.payload || null));
      return {
        ...state,
        currentUser: action.payload,
      };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(handleSignIn.pending, (state) => ({ ...state, loading: true, error: null }))
      .addCase(handleSignIn.fulfilled, (state, action: PayloadAction<UserProfile>) => ({
        ...state,
        loading: false,
        currentUser: action.payload,
        error: null,
      }))
      .addCase(handleSignIn.rejected, (state, action) => ({
        ...state,
        loading: false,
        error: action.payload as string,
      }))

      .addCase(handleSignUp.pending, (state) => ({ ...state, loading: true, error: null }))
      .addCase(handleSignUp.fulfilled, (state, action: PayloadAction<UserProfile>) => ({
        ...state,
        loading: false,
        currentUser: action.payload,
        error: null,
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
