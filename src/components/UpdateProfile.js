import { useAuth } from "../contexts/AuthContext";
import { Card, Alert, Form, Button } from "react-bootstrap";
import { useRef, useState } from "react";
import { Link, useHistory } from "react-router-dom";

export default function UpdateProfile() {
  const { currentUser, updateEmail, updatePassword } = useAuth();
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordconfirmRef = useRef();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  async function handleUpdateProfile(e) {
    e.preventDefault();

    if (passwordRef.current.value !== passwordconfirmRef.current.value) {
      return setError("Passwords do not match");
    }

    const promises = [];

    if (emailRef.current.value !== currentUser.email) {
      promises.push(updateEmail(emailRef.current.value));
    }

    if (passwordRef.current.value) {
      promises.push(updatePassword(passwordRef.current.value));
    }

    Promise.all(promises)
      .then(() => {
        history.push("/");
      })
      .catch(() => {
        setError("Failed to update profile");
      })
      .finally(() => {
        setLoading(false);
      });
  }

  return (
    <Card>
      <Card.Body>
        <h2 className="text-center mb-4">Update Profile</h2>
        {error && <Alert variant="danger">{error}</Alert>}
        <Form onSubmit={handleUpdateProfile}>
          <Form.Group id="email">
            <Form.Label>Email: </Form.Label>
            <Form.Control
              type="email"
              required
              ref={emailRef}
              defaultValue={currentUser.email}
            />
          </Form.Group>
          <Form.Group id="password">
            <Form.Label>Password: </Form.Label>
            <Form.Control
              type="password"
              ref={passwordRef}
              placeholder="leave blank to keep the same"
            />
          </Form.Group>
          <Form.Group id="passwordConfirm">
            <Form.Label>Password Confirm: </Form.Label>
            <Form.Control
              type="password"
              ref={passwordconfirmRef}
              placeholder="leave blank to keep the same"
            />
          </Form.Group>
          <Button disabled={loading} className="w-100 mt-4" type="submit">
            Update
          </Button>
        </Form>
      </Card.Body>
      <div className="w-100 text-center mt-2">
        <Link to="/">Cancel</Link>{" "}
      </div>
    </Card>
  );
}
