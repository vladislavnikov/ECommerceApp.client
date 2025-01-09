import apiEndpoints from "src/api.endpoints";
import apiRequest from "src/api/services/apiRequest";
import { UserProfile } from "@/shared/models/userProfile";
import { AuthPayload } from "@/shared/models/authPayload";

export const fetchSignIn = ({ username, password }: AuthPayload): Promise<UserProfile & { username: string }> => {
  return apiRequest<UserProfile & { username: string }>(apiEndpoints.signInPath, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, password }),
  });
};

export const fetchSignUp = ({ username, password }: AuthPayload): Promise<UserProfile & { username: string }> => {
  return apiRequest<UserProfile & { username: string }>(apiEndpoints.signUpPath, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, password }),
  });
};

export const changePassword = (newPassword: string, repeatNewPassword: string): Promise<{ message: string }> => {
  return apiRequest<{ message: string }>(apiEndpoints.changePassword, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ newPassword, repeatNewPassword }),
  });
};

export const saveUserChanges = async (profileData: Partial<UserProfile>): Promise<UserProfile> => {
  try {
    const response = await apiRequest<UserProfile>(apiEndpoints.saveProfile, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(profileData),
    });
    alert("Data changed successfully");
    return response;
  } catch (error) {
    console.error("Error in saveUserChanges:", error);
    throw new Error("Failed to save profile. Please try again.");
  }
};

export const getUserProfile = async (): Promise<UserProfile> => {
  try {
    const response = await apiRequest<UserProfile>(apiEndpoints.getProfile, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log(response);
    return response;
  } catch (error) {
    console.error("Error in getUserProfile:", error);
    throw new Error("Failed to fetch profile. Please try again.");
  }
};

export const uploadProfileImage = (formData: FormData): Promise<{ imageUrl: string }> => {
  return apiRequest<{ imageUrl: string }>(apiEndpoints.uploadProfileImage, {
    method: "POST",
    body: formData,
  });
};
