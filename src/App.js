import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { AuthProvider } from "./AuthContext";
import Dashboard from "./Dashboard";
import Login from "./Login";
import ProtectedRoute from "./ProtectedRoute";
import Register from "./Register";
import { UserProvider } from "./UserContext";
import User from "./User";

export default function App() {
  return (
    <AuthProvider>
      <UserProvider>
        <Router>
          <div className="wrapper">
            <Switch>
              <ProtectedRoute path="/dashboard" component={Dashboard} />
              <Route path="/user/:id" component={User} />
              <Route path="/register" component={Register} />
              <Route path="/" component={Login} />
            </Switch>
          </div>
        </Router>
      </UserProvider>
    </AuthProvider>
  );
}
