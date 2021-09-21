import axios from "axios";
import { createContext, useState, useEffect } from "react";
import setAuthToken from "./utils/setAuthToken";

const AuthContext = createContext();

export function AuthProvider(props) {
  const [user, setUser] = useState({});
  const [message, setMessage] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const userdata = localStorage.getItem("userdata");
    if (userdata) {
      const { token, filteredUser } = JSON.parse(userdata);
      setAuthToken(token);
      setUser(filteredUser);
      setIsAuthenticated(true);
    }
  }, []);

  const registerUser = async (data) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      setLoading(true);
      const res = await axios.post("/users/signup", data, config);
      const { user, token, message } = res.data;
      setAuthToken(token);
      const filteredUser = handleUser(user);
      localStorage.setItem("userdata", JSON.stringify({ token, filteredUser }));

      setUser(filteredUser);
      setIsAuthenticated(true);

      if (res.status === 500) {
        throw Error();
      } else {
        setMessage(message);
        setLoading(false);
      }
    } catch (error) {
      setMessage(error.message);
      setLoading(false);
    }
  };

  const loginUser = async (data) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      setLoading(true);
      const res = await axios.post("/users/login", data, config);
      const { user, token, message } = res.data;
      setAuthToken(token);
      const filteredUser = handleUser(user);

      localStorage.setItem("userdata", JSON.stringify({ token, filteredUser }));

      setUser(filteredUser);

      setIsAuthenticated(true);

      if (res.status === 500) {
        throw Error();
      } else {
        setMessage(message);
        setLoading(false);
      }
    } catch (error) {
      setMessage(error.message);
      setLoading(false);
    }
  };

  const logout = () => {
    setUser({});
    setIsAuthenticated(false);
    localStorage.clear();
  };

  const handleUser = (rawUser) => {
    return {
      fullName: rawUser.fullName,
      email: rawUser.email,
      sex: rawUser.sex,
      age: rawUser.age,
      isAdmin: rawUser.isAdmin,
      phone: rawUser.phone,
      date: rawUser.date,
    };
  };

  return (
    <AuthContext.Provider
      value={{ registerUser, loginUser, user, message, logout, isAuthenticated, loading }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}

export default AuthContext;
