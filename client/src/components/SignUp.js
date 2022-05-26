import React from "react";
import { Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";

const SignUp = () => {
   const {
      register,
      watch,
      handleSubmit,
      reset,
      formState: { errors },
      getValues,
   } = useForm();

   const signupUser = (data) => {
      console.log(data);
      function assign({ username, email, password }) {
         const data = { username: username, email: email, password: password };
         return data;
      }

      const requestOptions = {
         methods: "POST",
         headers: {
            "content-type": "application/json",
         },
         body: JSON.stringify(assign(data)),
      };

      fetch("/auth/sigup", requestOptions);

      reset();
   };
   console.log(watch("username"));

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
                     {...register("username", {
                        required: "username is required",
                        maxLength: 25,
                     })}
                  />
                  {errors.username?.type === "required" && (
                     <small className="form-error">
                        {errors.username.message}
                     </small>
                  )}
                  {errors.username?.type === "maxLength" && (
                     <small className="form-error">
                        Max characters should be 25
                     </small>
                  )}
               </Form.Group>
               {errors.username ? "" : <br />}
               <Form.Group>
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                     type="email"
                     placeholder="Your Email"
                     {...register("email", { required: true, maxLength: 80 })}
                  />
                  {errors.email?.type === "required" && (
                     <small className="form-error">email is required</small>
                  )}
                  {errors.email?.type === "maxLength" && (
                     <small className="form-error">
                        Max characters should be 80
                     </small>
                  )}
               </Form.Group>
               {errors.email ? "" : <br />}
               <Form.Group>
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                     type="password"
                     placeholder="Your Password"
                     {...register("password", {
                        required: true,
                        minLength: 5,
                     })}
                  />
                  {errors.password?.type === "required" && (
                     <small className="form-error">Password is required</small>
                  )}
                  {errors.password?.type === "minLength" && (
                     <small className="form-error">Password too short</small>
                  )}
                  {errors.password?.type === "pattern" && (
                     <small className="form-error">
                        Password must be alphanumeric
                     </small>
                  )}
               </Form.Group>
               {errors.password ? "" : <br />}
               <Form.Group>
                  <Form.Label>Confirm Password</Form.Label>
                  <Form.Control
                     type="password"
                     placeholder="Confirm Password"
                     {...register("confirmPassword", {
                        required: "Enter password again to confirm",
                        validate: {
                           matchesPreviousPasswords: (value) => {
                              const { password } = getValues();
                              return (
                                 password === value || "Passwords should match!"
                              );
                           },
                        },
                     })}
                  />
                  {errors.confirmPassword && (
                     <small className="form-error">
                        {errors.confirmPassword.message}
                     </small>
                  )}
               </Form.Group>
               {errors.confirmPassword ? "" : <br />}
               <br />
               <Form.Group>
                  <Button
                     as="sub"
                     variant="primary"
                     onClick={handleSubmit(signupUser)}
                  >
                     Sign Up
                  </Button>
               </Form.Group>
               <br />
               <small>
                  If you already have an account <Link to="/login">Login</Link>
               </small>
            </form>
         </div>
      </div>
   );
};

export default SignUp;
