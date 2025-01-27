"use client";
import {
  createContext,
  useState,
  useContext,
  useEffect,
  useCallback,
} from "react";
import { useRouter } from "next/navigation";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import { Token, User, UserRegistration } from "@/lib/definitions";

export interface AuthContextData {
  user: User | null; // Assuming `user` can be `null`, or define its type if known
  authTokens: Token | null;
  registerUser: (
    userData: UserRegistration
  ) => Promise<{ success: boolean; errors?: Error | null }>;
  loginUser: (credentials: {
    email: string;
    password: string;
  }) => Promise<void>;
  logoutUser: () => void;
  loading: boolean;
}

const defaultAuthContext: AuthContextData = {
  user: null, // Assuming `user` can be `null`, or define its type if known
  authTokens: null,
  registerUser: async () => ({ success: false, errors: null }), // Default async function
  loginUser: async () => {},
  logoutUser: () => {},
  loading: false,
};

const AuthContext = createContext<AuthContextData>(defaultAuthContext);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState(null);
  const [authTokens, setAuthTokens] = useState<Token | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const updateToken = useCallback(async () => {
    if (!authTokens?.refresh) {
      setLoading(false);
      return;
    }

    try {
      const response = await fetch("http://127.0.0.1:8000/api/token/refresh/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ refresh: authTokens.refresh }),
      });

      const data = await response.json();
      if (response.ok) {
        setAuthTokens(data);
        setUser(jwtDecode(data.access));
        localStorage.setItem("authTokens", JSON.stringify(data));
        document.cookie = `auth_token=${data.access}; path=/; max-age=${
          60 * 60 * 24 * 7
        }; SameSite=Strict; Secure`;
      } else {
        logoutUser();
      }
    } catch (error) {
      console.error("Token refresh error:", error);
      logoutUser();
    } finally {
      setLoading(false);
    }
  }, [authTokens]);

  const registerUser = async (userData: UserRegistration) => {
    try {
      const response = await fetch("http://127.0.0.1:8000/api/register/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      if (response.ok) {
        return { success: true };
      } else {
        const data = await response.json();
        return { success: false, errors: data };
      }
    } catch (error) {
      console.error("Registration error:", error);
      return {
        success: false,
        errors: { non_field_errors: ["An unexpected error occurred"] },
      };
    }
  };

  const loginUser = async (credentials: {
    email: string;
    password: string;
  }): Promise<void> => {
    console.log(JSON.stringify(credentials));
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/auth/token/",
        credentials,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = response.data; // Access data directly from response

      // Assuming 2xx status codes are considered successful
      console.log(data); // Should print resolved data

      setAuthTokens(data);
      setUser(jwtDecode<typeof data.access>(data.access));
      localStorage.setItem("authTokens", JSON.stringify(data));
      document.cookie = `auth_token=${data.access}; path=/; max-age=${
        60 * 60 * 24 * 7
      }; SameSite=Strict; Secure`;
      router.push("/");
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        // The error is an AxiosError
        if (error.response) {
          // Server responded with a status other than 2xx
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
          alert(error.response.data || "Login failed");
        } else if (error.request) {
          // Request made but no response received
          console.log(error.request);
          alert("Network error or server did not respond");
        } else {
          // Something happened setting up the request
          console.log("Error", error.message);
          alert(error.message);
        }
      } else {
        // Handle non-Axios errors
        console.log("An unexpected error occurred:", error);
        alert("An unexpected error occurred");
      }
    }
  };

  const logoutUser = useCallback(() => {
    localStorage.removeItem("authTokens");
    document.cookie =
      "auth_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
    setAuthTokens(null);
    setUser(null);
    router.push("/login");
  }, [router]);

  useEffect(() => {
    const storedTokens = localStorage.getItem("authTokens");
    if (storedTokens) {
      const tokens = JSON.parse(storedTokens);
      setAuthTokens(tokens);
      setUser(jwtDecode(tokens.access));
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    const REFRESH_INTERVAL = 1000 * 60 * 4; // 4 minutes
    let interval: NodeJS.Timeout | undefined;

    if (authTokens) {
      interval = setInterval(() => {
        updateToken();
      }, REFRESH_INTERVAL);
    }

    return () => clearInterval(interval);
  }, [authTokens, updateToken]);

  const contextData = {
    user,
    authTokens,
    registerUser,
    loginUser,
    logoutUser,
    loading,
  };

  return (
    <AuthContext.Provider value={contextData}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
