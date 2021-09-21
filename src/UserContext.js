import axios from "axios";
import { createContext, useState } from "react";

const API_URL = "https://customer-care-platform.herokuapp.com";

const UserContext = createContext();

export function UserProvider(props) {
  const [usersData, setUsersData] = useState(null);
  const [error, setError] = useState("");

  const getAllUsersData = async () => {
    try {
      const res = await axios.get(`${API_URL}/users`);

      setUsersData(res.data);
      if (res.status === 500) {
        throw Error();
      }
    } catch (error) {
      setError(error.message);
      // setLoading(false);
    }
  };

  return (
    <UserContext.Provider value={{ getAllUsersData, usersData, error }}>
      {props.children}
    </UserContext.Provider>
  );
}

export default UserContext;
