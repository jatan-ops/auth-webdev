import { useAuth } from "../contexts/AuthContext";
import { Card, Alert, Form, Button } from "react-bootstrap";
import { useRef, useState } from "react";
import { Link, useHistory } from "react-router-dom";

export default function SignUp() {
  const { signup } = useAuth();
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordconfirmRef = useRef();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  async function handleSignUp(e) {
    e.preventDefault();

    if (passwordRef.current.value !== passwordconfirmRef.current.value) {
      return setError("Passwords do not match");
    }

    try {
      setError("");
      setLoading(true);
      await signup(emailRef.current.value, passwordRef.current.value);
      history.push("/dashboard");
    } catch {
      setError("Failed to log in");
    }
    setLoading(false);
  }

  return (
    <Card>
      <Card.Body>
        <h2 className="text-center mb-4">Sign Up</h2>
        {error && <Alert variant="danger">{error}</Alert>}
        <Form onSubmit={handleSignUp}>
          <Form.Group id="email">
            <Form.Label>Email: </Form.Label>
            <Form.Control type="email" required ref={emailRef} />
          </Form.Group>
          <Form.Group id="password">
            <Form.Label>Password: </Form.Label>
            <Form.Control type="password" required ref={passwordRef} />
          </Form.Group>
          <Form.Group id="passwordConfirm">
            <Form.Label>Password Confirm: </Form.Label>
            <Form.Control type="password" required ref={passwordconfirmRef} />
          </Form.Group>
          <Button disabled={loading} className="w-100 mt-4" type="submit">
            Sign Up
          </Button>
        </Form>
      </Card.Body>
      <div className="w-100 text-center mt-2">
        Already have an account? <Link to="/signin">Sign In</Link>{" "}
      </div>
    </Card>
  );
}
