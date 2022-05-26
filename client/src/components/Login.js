import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";

const Login = () => {
   const {
      register,
      watch,
      handleSubmit,
      reset,
      formState: { errors },
   } = useForm();

   const loginUser = (data) => {
      console.log(data);
      reset();
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
                     {...register("username", { required: true })}
                  />
                  {errors.username?.type === "required" && (
                     <span style={{ color: "red" }}>Username is required</span>
                  )}
               </Form.Group>
               <br />
               <Form.Group>
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                     type="password"
                     placeholder="Your Password"
                     {...register("password", { required: true })}
                  />
                  {errors.password?.type === "required" && (
                     <span style={{ color: "red" }}>Password is required</span>
                  )}
               </Form.Group>
               <br />
               <Form.Group>
                  <Button
                     as="sub"
                     variant="primary"
                     onClick={handleSubmit(loginUser)}
                  >
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
