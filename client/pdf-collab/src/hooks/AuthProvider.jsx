import { useEffect, useContext, createContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("siteToken") || "");
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("siteUser");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const loginAction = async (data) => {
    try {
      const response = await axios.post("https://pdf-share.onrender.com/api/auth/login", 
        {
          email: data.email,
          password: data.password  
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        });
      
      if (!response.data.error) {
        const userData = response.data.user;
        setUser(userData);
        setToken(response.data.token);
        localStorage.setItem("siteUser", JSON.stringify(userData));
        localStorage.setItem("siteToken", response.data.token);
        navigate("/dashboard");
        return;
      }
      throw new Error(response.data.message);
    } catch (err) {
      console.error(err);
    }
  };

  const registerAction = async (data) => {
    try {
      const response = await axios.post("https://pdf-share.onrender.com/api/auth/register", 
        {
          username: data.username,
          email: data.email,
          password: data.password  
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        });
      
      if (!response.data.error) {
        const userData = response.data.user;
        setUser(userData);
        setToken(response.data.token);
        localStorage.setItem("siteUser", JSON.stringify(userData));
        localStorage.setItem("siteToken", response.data.token);
        navigate("/dashboard");
        return;
      }
      throw new Error(response.data.message);
    } catch (err) {
      console.error(err);
    }
  };

  const getCurrentUserEmail = () => {
    return user ? user.email : null;
  };

  const logOut = () => {
    setUser(null);
    setToken("");
    localStorage.removeItem("siteUser");
    localStorage.removeItem("siteToken");
    navigate("/");
  };

  return (
    <AuthContext.Provider value={{ token, user, loginAction, logOut, registerAction, getCurrentUserEmail }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

export const useAuth = () => {
  return useContext(AuthContext);
};
