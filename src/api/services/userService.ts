import apiEndpoints from "src/api.endpoints";
import apiRequest from "src/api/services/apiRequest";

export const fetchSignIn = (username: string, password: string): Promise<{ message: string }> => {
  return apiRequest<{ message: string }>(apiEndpoints.signInPath, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, password }),
  });
};

export const fetchSignUp = (username: string, password: string): Promise<{ message: string }> => {
  return apiRequest<{ message: string }>(apiEndpoints.signUpPath, {
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

export const saveUserChanges = async (profileData: {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  address: string;
}): Promise<{ message: string }> => {
  try {
    const response = await apiRequest<{ message: string }>(apiEndpoints.saveProfile, {
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
