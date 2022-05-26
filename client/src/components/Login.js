import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const Login = () => {
   const [username, setUsername] = useState("");
   const [password, setPassword] = useState("");

   const loginUser = () => {
      console.log("form Submitted");
      console.log(username, password);
      setUsername("");
      setPassword("");
   };
   const handleInput = (e) => {
      const name = e.currentTarget.name;
      const value = e.currentTarget.value;

      if (name === "username") setUsername(value);
      if (name === "password") setPassword(value);
   };
   return (
      <div className="container">
         <div className="form">
            <h1>Login Page</h1>
            <form>
               <Form.Group>
                  <Form.Label>Username</Form.Label>
                  <Form.Control
                     type="text"
                     placeholder="Your Username"
                     value={username}
                     onChange={handleInput}
                     name="username"
                  />
               </Form.Group>
               <br />
               <Form.Group>
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                     type="password"
                     placeholder="Your Password"
                     value={password}
                     onChange={handleInput}
                     name="password"
                  />
               </Form.Group>
               <br />
               <Form.Group>
                  <Button as="sub" variant="primary" onClick={loginUser}>
                     Sign Up
                  </Button>
               </Form.Group>
               <br />
               <small>
                  If you don't have an account <Link to="/signup">Sign Up</Link>
               </small>
            </form>
         </div>
      </div>
   );
};

export default Login;
