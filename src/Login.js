import { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router";
import AuthContext from "./AuthContext";

function Login() {
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const history = useHistory();

  const { email, password } = data;

  const { loginUser, message, isAuthenticated } = useContext(AuthContext);

  useEffect(() => {
    if (isAuthenticated) {
      history.push("/dashboard");
    }
  }, [isAuthenticated, history]);

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    loginUser(data);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="Password">Email: </label>
        <input type="email" value={email} name="email" onChange={handleChange} />
      </div>

      <div>
        <label htmlFor="Password">Password: </label>
        <input type="password" value={password} name="password" onChange={handleChange} />
      </div>

      <button type="submit">Submit</button>
      <p>{message}</p>
    </form>
  );
}

export default Login;
