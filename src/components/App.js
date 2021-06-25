import { Container } from "react-bootstrap";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { AuthProvider } from "../contexts/AuthContext";
import PrivateRoute from "./PrivateRoute";
import SignUp from "./SignUp";
import SignIn from "./SignIn";
import Dashboard from "./Dashboard";
import ForgotPassword from "./ForgotPassword";
import UpdateProfile from "./UpdateProfile";

function App() {
  return (
    <Container
      className="d-flex align-items-center justify-content-center"
      style={{ minHeight: "100vh" }}
    >
      <div className="w-100" style={{ maxWidth: "400px" }}>
        <Router>
          <AuthProvider>
            <Switch>
              <Route path="/signup" component={SignUp} />
              <Route path="/signin" component={SignIn} />
              <Route path="/forgot-password" component={ForgotPassword} />
              <PrivateRoute exact path="/" component={Dashboard} />
              <PrivateRoute path="/update-profile" component={UpdateProfile} />
            </Switch>
          </AuthProvider>
        </Router>
      </div>
    </Container>
  );
}

export default App;
