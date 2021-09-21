import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { AuthProvider } from "./AuthContext";
import Dashboard from "./Dashboard";
import Home from "./Home";
import Login from "./Login";
import ProtectedRoute from "./ProtectedRoute";
import Register from "./Register";
import { UserProvider } from "./UserContext";

export default function App() {
  return (
    <AuthProvider>
      <UserProvider>
        <Router>
          <div className="wrapper">
            <Switch>
              <ProtectedRoute path="/dashboard" component={Dashboard} />

              <Route path="/register">
                <Register />
              </Route>

              <Route path="/login">
                <Login />
              </Route>

              <Route path="/">
                <Home />
              </Route>
            </Switch>
          </div>
        </Router>
      </UserProvider>
    </AuthProvider>
  );
}
