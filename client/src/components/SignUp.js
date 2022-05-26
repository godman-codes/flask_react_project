import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";

const SignUp = () => {
   const [username, setUsername] = useState("");
   const [email, setEmail] = useState("");
   const [password, setPassword] = useState("");
   const [confirmPassword, setConfirmPassword] = useState("");

   const submitForm = () => {
      console.log("form Submitted");
   };
   const handleInput = (e) => {
      const name = e.currentTarget.name;
      const value = e.currentTarget.value;

      if (name === "username") setUsername(value);
      if (name === "email") setEmail(value);
      if (name === "password") setPassword(value);
      if (name === "confirmPassword") setConfirmPassword(value);
   };

   return (
      <div className="container">
         <div className="form">
            <h1>Sign Up Page</h1>
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
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                     type="email"
                     placeholder="Your Email"
                     value={email}
                     onChange={handleInput}
                     name="email"
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
                  <Form.Label>Confirm Password</Form.Label>
                  <Form.Control
                     type="password"
                     placeholder="Confirm Password"
                     value={confirmPassword}
                     onChange={handleInput}
                     name="confirmPassword"
                  />
               </Form.Group>
               <br />
               <Form.Group>
                  <Button as="sub" variant="primary" onClick={submitForm}>
                     Sign Up
                  </Button>
               </Form.Group>
               <br />
            </form>
         </div>
      </div>
   );
};

export default SignUp;
