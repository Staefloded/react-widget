import { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router";
import AuthContext from "./AuthContext";

function Register() {
  const [user, setUser] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    sex: "",
    age: "",
    isAdmin: false,
  });

  const history = useHistory();
  const { fullName, age, email, password, sex, isAdmin, phone } = user;

  const { registerUser, message, isAuthenticated } = useContext(AuthContext);

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    if (isAuthenticated) {
      history.push("/dashboard");
    }
  }, [isAuthenticated, history]);

  const handleSubmit = (e) => {
    e.preventDefault();

    registerUser(user);
  };

  return (
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
        <label htmlFor="Password">Password: </label>
        <input type="password" value={password} name="password" onChange={handleChange} />
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
        <label htmlFor="Password">Email: </label>
        <input type="email" value={email} name="email" onChange={handleChange} />
      </div>
      <div>
        <label htmlFor="Password">Phone: </label>
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
  );
}

export default Register;
