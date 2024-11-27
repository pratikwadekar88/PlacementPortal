import React, { createContext, useContext, useState, useEffect } from "react";

// Create a Context for the User data
const UserContext = createContext();

// Create a Provider component to wrap around the app
export const UserProvider = ({ children }) => {
  // State to store user data (e.g., name, email, etc.)
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);

  // Function to update the user
  const setUserData = (userData) => {
    setUser(userData);
    // Save the user data to localStorage
    localStorage.setItem("user", JSON.stringify(userData));
  };

  useEffect(() => {
    // Check if there's saved user data in localStorage
    const savedUser = localStorage.getItem("user");
    const savedRole = localStorage.getItem("role");
    if (savedUser) {
      // If saved data exists, set it as user data
      setUser(JSON.parse(savedUser));
    }
    if (savedRole) {
      // If saved data exists, set it as user data
      setRole(savedRole);
    }
  }, []);

  return (
    <UserContext.Provider value={{ user, setUserData, role }}>
      {children}
    </UserContext.Provider>
  );
};

// Custom hook to use user context
export const useUser = () => {
  return useContext(UserContext);
};
