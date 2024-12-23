const API_URL = "https://example.com/api";

export const signInApi = async (username: string, password: string) => {
  try {
    const response = await fetch(`${API_URL}/signin`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });

    if (!response.ok) {
      throw new Error("Sign In failed. Please check your credentials.");
    }

    const data = await response.json();
    return data;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(error.message || "Something went wrong during sign in.");
    } else {
      throw new Error("Something went wrong during sign in.");
    }
  }
};

export const signUpApi = async (username: string, password: string) => {
  try {
    const response = await fetch(`${API_URL}/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });

    if (!response.ok) {
      throw new Error("Sign Up failed. Please try again.");
    }

    const data = await response.json();
    return data;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(error.message || "Something went wrong during sign up.");
    } else {
      throw new Error("Something went wrong during sign up.");
    }
  }
};
