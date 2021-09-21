import { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import AuthContext from "./AuthContext";
import UserContext from "./UserContext";

export default function Dashboard() {
  const { user, logout } = useContext(AuthContext);
  const { getAllUsersData, usersData, deleteUser, message } = useContext(UserContext);

  useEffect(() => {
    user?.isAdmin && getAllUsersData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  return (
    <div>
      <nav>
        <button onClick={() => logout()}>Logout</button>
      </nav>

      <p>This is the Dashboard</p>
      <p>{user?.email}</p>
      <p>{user?.fullName}</p>
      <p>{user?.phone}</p>
      <p>{user?.age}</p>
      {message}

      <h3>{usersData?.message}</h3>
      <h3>{usersData && usersData?.data?.length}</h3>

      {usersData &&
        usersData?.data?.map((item, index) => (
          <ul key={index}>
            <li>{item.fullName}</li>
            <li>{item.email}</li>
            <li>{item.phone}</li>
            <Link to={`/user/${item._id}`}>View More</Link>
            <button onClick={() => deleteUser(item._id)}>Delete User</button>
          </ul>
        ))}
    </div>
  );
}
