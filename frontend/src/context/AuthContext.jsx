import { createContext, useContext, useState, useEffect } from "react";
import { API } from "../utils/Axios";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  

  
  

  const logout = async () => {
    try {
      console.log("🚪 Logging out user...");
      await API.post("/user/logout"); // Backend se logout API ko call karein
      console.log("✅ Backend logout successful");
    } catch (error) {
      console.error("💥 Logout API error:", error);
    } finally {
      // Frontend state aur localStorage ko saaf karein
      setToken(null);
    
      
      localStorage.removeItem("token");
      console.log("✅ User logged out successfully");
    }
  };

  useEffect(() => {
    // Yehi token aur user ko state mein load karta hai jab page reload hota hai
    const storedToken = localStorage.getItem("token");
  
    if (storedToken ) {
      setToken(storedToken);
     
    }
  }, []);

  return (
    <AuthContext.Provider value={{ token, logout,setToken }}>
      {children}
    </AuthContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => useContext(AuthContext);

