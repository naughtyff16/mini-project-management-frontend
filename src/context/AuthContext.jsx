import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser, registerUser } from "../api/authApi";
import toast from "react-hot-toast";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const name = localStorage.getItem("name");

    if (token && name) {
      setUser({ name });
    }
  }, []);

  const register = async (data) => {
    try {
      const res = await registerUser(data);
      localStorage.setItem("token", res.data.data.token);
      localStorage.setItem("name", res.data.data.name);
      setUser(res.data.data);
      navigate("/dashboard");
      toast.success("Registered Successfully");
    } catch (error) {
      toast.error(error.response?.data?.message || "Error");
    }
  };

  const login = async (data) => {
    try {
      const res = await loginUser(data);
      localStorage.setItem("token", res.data.data.token);
      localStorage.setItem("name", res.data.data.name);
      setUser(res.data.data);
      navigate("/dashboard");
      toast.success("Logged In Successfully");
    } catch (error) {
      toast.error(error.response?.data?.message || "Error");
    }
  };

  const logout = () => {
    localStorage.clear();
    setUser(null);
    navigate("/");
  };

  return (
    <AuthContext.Provider value={{ user, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
