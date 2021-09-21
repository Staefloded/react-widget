import { useContext } from "react";
import AuthContext from "./AuthContext";
import UserContext from "./UserContext";

// {
//   admintest@gmail.com
//   password
// }

export default function Dashboard() {
  const { user, logout } = useContext(AuthContext);
  const { getAllUsersData, usersData } = useContext(UserContext);

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

      {user.isAdmin && (
        <div>
          <button onClick={() => getAllUsersData()}>Get All users</button>

          <button>Get a user</button>
        </div>
      )}

      <h3>{usersData?.message}</h3>
      {usersData?.data?.map((item, index) => (
        <ul>
          <li key={index}>{item.fullName}</li>
          <li key={index}>{item.email}</li>
          <li key={index}>{item.phone}</li>
        </ul>
      ))}
    </div>
  );
}
