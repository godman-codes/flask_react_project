import React, { useState } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

const CreateRecipePage = () => {
   const navigate = useNavigate();

   const {
      register,
      // watch,
      handleSubmit,
      reset,
      formState: { errors },
      // getValues,
   } = useForm();

   const createRecipe = (data) => {
      console.log(data);
      const token = JSON.parse(localStorage.getItem("REACT_TOKEN_AUTH_KEY"));
      console.log(token);

      function assign({ title, description }) {
         const data = { title: title, description: description };
         return data;
      }

      const requestOptions = {
         method: "POST",
         headers: {
            Authorization: `Bearer ${token}`,
            "content-type": "application/json",
         },
         body: JSON.stringify(assign(data)),
      };

      fetch("/recipe/recipes", requestOptions)
         .then((res) => res.json())
         .then((data) => {
            console.log(data);
            // navigate("/");
         })
         .catch((err) => console.log(err));

      reset();
   };

   return (
      <div className="container">
         <h1>Create A Recipe</h1>
         <form>
            <Form.Group>
               <Form.Label>Title</Form.Label>
               <Form.Control
                  type="text"
                  placeholder="Title"
                  {...register("title", {
                     required: "Title is required",
                     maxLength: 25,
                  })}
               />
               {errors.title?.type === "required" && (
                  <small className="form-error">{errors.title.message}</small>
               )}
               {errors.title?.type === "maxLength" && (
                  <small className="form-error">
                     Max characters should be 25
                  </small>
               )}
            </Form.Group>
            {errors.title ? "" : <br />}
            <Form.Group>
               <Form.Label>Description</Form.Label>
               <Form.Control
                  as="textarea"
                  row={5}
                  placeholder="Description"
                  {...register("description", {
                     required: "Description is required",
                     maxLength: 255,
                  })}
               />
               {errors.description?.type === "required" && (
                  <small className="form-error">
                     {errors.description.message}
                  </small>
               )}
               {errors.description?.type === "maxLength" && (
                  <small className="form-error">
                     Max characters should be 255
                  </small>
               )}
            </Form.Group>
            {errors.description ? "" : <br />}
            <br></br>
            <Form.Group>
               <Button variant="primary" onClick={handleSubmit(createRecipe)}>
                  Save
               </Button>
            </Form.Group>
         </form>
      </div>
   );
};

export default CreateRecipePage;
