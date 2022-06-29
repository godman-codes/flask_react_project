import React from "react";
import { Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { login } from "../auth";
import { useNavigate } from "react-router-dom";

const Login = () => {
   const {
      register,
      // watch,
      handleSubmit,
      reset,
      formState: { errors },
   } = useForm();
   const navigate = useNavigate();

   const loginUser = (data) => {
      console.log(data);
      function assign({ username, password }) {
         const data = { username: username, password: password };
         return data;
      }

      const requestOptions = {
         method: "POST",
         headers: {
            "content-type": "application/json",
         },
         body: JSON.stringify(assign(data)),
      };

      fetch("/auth/login", requestOptions)
         .then((res) => res.json())
         .then((data) => {
            console.log(data.access_token);
            login(data.access_token);
            navigate("/");
         })
         .catch((err) => console.log(err));

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
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                     type="password"
                     placeholder="Your Password"
                     {...register("password", {
                        required: "Password is required",
                     })}
                  />
                  {errors.password?.type === "required" && (
                     <small className="form-error">
                        {errors.password.message}
                     </small>
                  )}
               </Form.Group>
               {errors.password ? "" : <br />}
               <Form.Group>
                  <Button
                     as="sub"
                     variant="primary"
                     onClick={handleSubmit(loginUser)}
                  >
                     Login
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
