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
   } = useForm();

   const signupUser = (data) => {
      console.log(data);
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
                        required: true,
                        maxLength: 25,
                     })}
                  />
                  {errors.username?.type === "required" && (
                     <span style={{ color: "red" }}>Username is required</span>
                  )}
                  {errors.username?.type === "required" && <br />}
                  {errors.username?.type === "maxLength" && (
                     <span style={{ color: "red" }}>
                        Max characters should be 25
                     </span>
                  )}
               </Form.Group>
               <br />
               <Form.Group>
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                     type="email"
                     placeholder="Your Email"
                     {...register("email", { required: true, maxLength: 80 })}
                  />
                  {errors.email?.type === "required" && (
                     <span style={{ color: "red" }}>email is required</span>
                  )}
                  {errors.email?.type === "required" && <br />}
                  {errors.email?.type === "maxLength" && (
                     <span style={{ color: "red" }}>
                        Max characters should be 80
                     </span>
                  )}
               </Form.Group>
               <br />
               <Form.Group>
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                     type="password"
                     placeholder="Your Password"
                     {...register("password", { required: true, minLength: 8 })}
                  />
                  {errors.password?.type === "required" && (
                     <span style={{ color: "red" }}>Password is required</span>
                  )}
                  {errors.password?.type === "required" && <br />}
                  {errors.password?.type === "minLength" && (
                     <span style={{ color: "red" }}>Password too short</span>
                  )}
               </Form.Group>
               <br />
               <Form.Group>
                  <Form.Label>Confirm Password</Form.Label>
                  <Form.Control
                     type="password"
                     placeholder="Confirm Password"
                     {...register("confirmPassword", {
                        required: true,
                        minLength: 8,
                     })}
                  />
                  {errors.confirmPassword?.type === "required" && (
                     <span style={{ color: "red" }}>
                        Confirm Password is required
                     </span>
                  )}
               </Form.Group>
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
