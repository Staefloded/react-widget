import { useContext } from "react";
import { Redirect, Route } from "react-router";
import AuthContext from "./AuthContext";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const authContext = useContext(AuthContext);
  const { isAuthenticated } = authContext;
  return (
    <Route
      {...rest}
      render={(props) => (!isAuthenticated ? <Redirect to="/login" /> : <Component {...props} />)}
    />
  );
};

export default PrivateRoute;
