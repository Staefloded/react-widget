import { useContext, useEffect, useState } from "react";
import UserContext from "./UserContext";

export default function User({ match, history }) {
  const [userProfile, setUserProfile] = useState({
    fullName: "",
    email: "",
    sex: "",
    age: "",
    isAdmin: "",
    phone: "",
  });

  const { fullName, age, email, sex, isAdmin, phone } = userProfile;

  const handleChange = (e) => {
    setUserProfile({ ...userProfile, [e.target.name]: e.target.value });
  };

  const {
    usersData,
    getASingleUserData,
    updateUser,
    setCurrentUser,
    clearCurrentUser,
    current,
    message,
  } = useContext(UserContext);
  console.log(usersData);

  useEffect(() => {
    if (current !== null) {
      setUserProfile(current);
    } else {
      setUserProfile({
        fullName: "",
        email: "",
        sex: "",
        age: "",
        isAdmin: "",
        phone: "",
      });
    }
  }, [current]);

  useEffect(() => {
    getASingleUserData(match.params.id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    updateUser(userProfile);

    clearAll();
  };

  const clearAll = () => {
    clearCurrentUser();
  };

  if (usersData?.data._id === match.params.id);

  return (
    <div>
      <button onClick={() => history.push("/")}>Go back</button>
      <ul>
        <li>FullName: {usersData?.data?.fullName}</li>
        <li>Email: {usersData?.data?.email}</li>
        <li>Is Admin: {usersData?.data?.isAdmin?.toString()}</li>
        <li>Phone Number: {usersData?.data?.phone}</li>
        <li>Age: {usersData?.data?.age}</li>
        <li>Sex: {usersData?.data?.sex}</li>
        <button onClick={() => setCurrentUser(usersData?.data)}>Edit</button>
      </ul>

      <h2 className="text-primary">{current && "Edit Contact"}</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="Full Name">Full Name: </label>
          <input type="text" value={fullName} name="fullName" onChange={handleChange} />
        </div>

        <div>
          <label htmlFor="Age">Age: </label>
          <input type="text" value={age} name="age" onChange={handleChange} />
        </div>

        <div>
          <label htmlFor="Sex">Sex:</label>
          <input
            type="radio"
            value="male"
            name="sex"
            checked={sex === "male"}
            onChange={handleChange}
          />{" "}
          Male
          <input
            type="radio"
            value="female"
            name="sex"
            checked={sex === "female"}
            onChange={handleChange}
          />{" "}
          Female
          <input
            type="radio"
            value="other"
            name="sex"
            checked={sex === "other"}
            onChange={handleChange}
          />{" "}
          Other
        </div>

        <div>
          <label htmlFor="email">Email: </label>
          <input type="email" value={email} name="email" onChange={handleChange} />
        </div>

        <div>
          <label htmlFor="phone">Phone: </label>
          <input type="text" value={phone} name="phone" onChange={handleChange} />
        </div>

        <div>
          <label>
            Is Administrator?
            <select value={isAdmin} onChange={handleChange} name="isAdmin">
              <option value={false}>False</option>
              <option value={true}>True</option>
            </select>
          </label>
        </div>

        <button type="submit">Submit</button>
        <p>{message}</p>
      </form>
    </div>
  );
}
