import axios from "axios";
import { createContext, useReducer } from "react";

const UserContext = createContext();

const initialState = {
  usersData: null,
  message: null,
  current: null,
};

function reducer(state, action) {
  switch (action.type) {
    case "GET_ALL_USERS":
      return {
        ...state,
        usersData: action.payload,
        loading: false,
        message: action.payload.message,
      };

    case "GET_SINGLE_USER":
      return {
        ...state,
        loading: false,
        usersData: action.payload,
      };

    case "DELETE_USER":
      return {
        ...state,
        usersData: state.usersData.filter((item) => item._id !== action.payload),
        loading: false,
      };

    case "UPDATE_USER":
      return {
        ...state,
        usersData: state.usersData.map((user) =>
          user._id === action.payload._id ? action.payload : user
        ),
        loading: false,
        message: action.payload.message,
      };

    case "SET_CURRENT_USER":
      return {
        ...state,
        current: action.payload,
      };

    case "CLEAR_CURRENT_USER":
      return {
        ...state,
        current: null,
      };

    case "USER_ERROR":
      return {
        ...state,
        message: action.payload,
      };

    default:
      return state;
  }
}

export function UserProvider(props) {
  const [state, dispatch] = useReducer(reducer, initialState);

  // getall users
  const getAllUsersData = async () => {
    try {
      const res = await axios.get("/users");

      dispatch({
        type: "GET_ALL_USERS",
        payload: res.data,
      });

      if (res.status === 500) {
        throw Error();
      }
    } catch (error) {
      dispatch({
        type: "USER_ERROR",
        payload: error.message,
      });
    }
  };

  // get single user

  const getASingleUserData = async (id) => {
    const config = {
      headers: {
        "x-auth-token": JSON.parse(localStorage.getItem("userdata")).token,
      },
    };
    try {
      const res = await axios.get(`/users/${id}`, config);

      dispatch({
        type: "GET_SINGLE_USER",
        payload: res.data,
      });

      if (res.status === 500) {
        throw Error();
      }
    } catch (error) {
      dispatch({
        type: "USER_ERROR",
        payload: error.message,
      });
    }
  };

  // delete User

  const deleteUser = async (id) => {
    try {
      const res = await axios.delete(`/users/delete/${id}`);

      dispatch({
        type: "GET_SINGLE_USER",
        payload: id,
      });

      if (res.status !== 200) {
        throw Error();
      }
    } catch (error) {
      dispatch({
        type: "USER_ERROR",
        payload: error.message,
      });
    }
  };

  const updateUser = async (user) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${JSON.parse(localStorage.getItem("userdata")).token}`,
      },
    };

    try {
      const res = await axios.put(`/users/edit/${user._id}`, user, config);

      dispatch({
        type: "UPDATE_USER",
        payload: res.data,
      });

      if (res.status !== 200) {
        throw Error();
      }
    } catch (error) {
      dispatch({
        type: "USER_ERROR",
        payload: error.message,
      });
    }
  };

  const setCurrentUser = (user) => {
    dispatch({
      type: "SET_CURRENT_USER",
      payload: user,
    });
  };

  const clearCurrentUser = () => {
    dispatch({
      type: "CLEAR_CURRENT_USER",
    });
  };

  return (
    <UserContext.Provider
      value={{
        usersData: state.usersData,
        message: state.message,
        loading: state.loading,
        current: state.current,
        getAllUsersData,
        getASingleUserData,
        deleteUser,
        updateUser,
        setCurrentUser,
        clearCurrentUser,
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
}

export default UserContext;
