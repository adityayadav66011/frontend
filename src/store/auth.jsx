import { createContext, useContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // Initialize token state from local storage
  const [token, setToken] = useState(() => {
    const storedToken = localStorage.getItem("token");
    return storedToken || "";
  });

  const [services, setServices] = useState("");

  // Function to store the token in local storage
  const storeTokenInLS = (serverToken) => {
    setToken(serverToken);
    localStorage.setItem("token", serverToken);
  };

  const isLoggedIn = !!token;

  // Function to logout user
  const logoutUser = () => {
    setToken("");
    localStorage.removeItem("token");
  };

  // Function to fetch services data from the database
  const getServices = async () => {
    try {
      const response = await fetch("https://qwerty-cdz5.onrender.com/api/data/service", {
        method: "GET",
      });

      if (response.ok) {
        const data = await response.json();
        setServices(data.msg);
      }
    } catch (error) {
      console.log(`Services frontend error: ${error}`);
    }
  };

  useEffect(() => {
    getServices();
  }, []);

  // Dynamically compute authorization token when token changes
  const authorizationToken = `Bearer ${token}`;

  return (
    <AuthContext.Provider
      value={{ isLoggedIn, storeTokenInLS, logoutUser, services, authorizationToken }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const authContextValue = useContext(AuthContext);
  if (!authContextValue) {
    throw new Error("useAuth used outside of the Provider");
  }
  return authContextValue;
};
