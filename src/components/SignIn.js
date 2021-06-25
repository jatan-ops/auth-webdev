import { useAuth } from "../contexts/AuthContext";
import { Card, Alert, Form, Button } from "react-bootstrap";
import { useRef, useState } from "react";
import { Link, useHistory } from "react-router-dom";

export default function SignIn() {
  const { signin } = useAuth();
  const emailRef = useRef();
  const passwordRef = useRef();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  async function handleSignIn(e) {
    e.preventDefault();

    try {
      setError("");
      setLoading(true);
      await signin(emailRef.current.value, passwordRef.current.value);
      history.push("/");
    } catch {
      setError("Failed to sign in");
    }
    setLoading(false);
  }

  return (
    <>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Sign In</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSignIn}>
            <Form.Group id="email">
              <Form.Label>Email: </Form.Label>
              <Form.Control type="email" required ref={emailRef} />
            </Form.Group>
            <Form.Group id="password">
              <Form.Label>Password: </Form.Label>
              <Form.Control type="password" required ref={passwordRef} />
            </Form.Group>
            <Button disabled={loading} className="w-100 mt-4" type="submit">
              Sign In
            </Button>
          </Form>
          <div className="text-center mt-3">
            <Link to="/forgot-password">Forgot Password?</Link>
          </div>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        Doesn't have an account? <Link to="/signup">Sign Up</Link>{" "}
      </div>
    </>
  );
}
