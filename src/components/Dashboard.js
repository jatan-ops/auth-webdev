import { useAuth } from "../contexts/AuthContext";
import { Card, Alert, Button } from "react-bootstrap";
import { useState } from "react";
import { Link, useHistory } from "react-router-dom";

export default function Dashboard() {
  const { signout, currentUser } = useAuth();
  const [error, setError] = useState("");
  const history = useHistory();

  async function handleLogOut(e) {
    setError("");

    try {
      await signout();
      history.push("/signin");
    } catch {
      setError("Failed to log out");
    }
  }

  return (
    <>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Profile</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <strong>Email: </strong> {currentUser.email}
          <Link to="/update-profile" className="w-100 btn btn-primary mt-3">
            Update Profile
          </Link>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        <Button variant="link" onClick={handleLogOut}>
          Sign Out
        </Button>
      </div>
    </>
  );
}
