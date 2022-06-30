import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../auth";
import Recipe from "./Recipe";
import { Modal, Form, Button } from "react-bootstrap";
import { useForm } from "react-hook-form";

const LoggedInHome = () => {
   const [recipes, setRecipes] = useState([]);
   const [show, setShow] = useState(false);
   const [recipeId, setRecipeId] = useState(0);
   const [showDeleteModal, setShowDeleteModal] = useState(false);

   const token = JSON.parse(localStorage.getItem("REACT_TOKEN_AUTH_KEY"));

   const {
      register,
      handleSubmit,
      reset,
      formState: { errors },
      setValue,
   } = useForm();

   useEffect(() => {
      fetch("/recipe/recipes")
         .then((res) => res.json())
         .then((data) => {
            console.log(data);
            setRecipes(data);
         })
         .catch((err) => console.log(err));
   }, [show, showDeleteModal]);

   const closeModal = () => {
      setShow(false);
   };
   const closeDeleteModal = () => {
      setShowDeleteModal(false);
   };
   const showModal = (id) => {
      console.log("hello " + id);
      setShow(true);
      setRecipeId(id);

      recipes.map((recipe) => {
         if (recipe.id === id) {
            setValue("title", recipe.title);
            setValue("description", recipe.description);
         }
      });
   };

   const showConfirmModal = (id) => {
      console.log("delete " + id);
      setShowDeleteModal(true);
      setRecipeId(id);
   };

   const updateRecipe = (data) => {
      console.log(data);
      const requestOptions = {
         method: "PUT",
         headers: {
            "content-type": "application/json",
            Authorization: `Bearer ${token}`,
         },
         body: JSON.stringify(data),
      };

      fetch(`/recipe/recipe/${recipeId}`, requestOptions)
         .then((res) => res.json())
         .then((data) => {
            console.log(data);
            setShow(false);
            reset();
         })
         .catch((err) => console.log(err));

      reset();
   };

   const deleteRecipe = () => {
      const requestOptions = {
         method: "DELETE",
         headers: {
            "content-type": "application/json",
            Authorization: `Bearer ${token}`,
         },
      };

      fetch(`/recipe/recipe/${recipeId}`, requestOptions)
         .then((res) => res.json())
         .then((data) => {
            console.log(data);
            // console.log();
            setShowDeleteModal(false);
            // const reload = window.location.reload();
            // reload();
         })
         .catch((err) => console.log(err));
   };

   return (
      <div className="home container">
         <Modal show={show} size="lg" onHide={closeModal}>
            <Modal.Header closeButton>
               <Modal.Title>Update Recipe</Modal.Title>
            </Modal.Header>
            <Modal.Body>
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
                        <small className="form-error">
                           {errors.title.message}
                        </small>
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
                     <Button
                        variant="primary"
                        onClick={handleSubmit(updateRecipe)}
                     >
                        Save
                     </Button>
                  </Form.Group>
               </form>
            </Modal.Body>
         </Modal>
         <Modal show={showDeleteModal} size="lg" onHide={closeDeleteModal}>
            <Modal.Header closeButton>
               <Modal.Title>Confirm</Modal.Title>
            </Modal.Header>
            <Modal.Body>
               <p>Are you sure You want to delete this recipe</p>
               <Button variant="success" onClick={() => deleteRecipe()}>
                  Yes
               </Button>
            </Modal.Body>
         </Modal>
         <h1>List of Recipes</h1>
         {recipes.map((recipe, i) => (
            <Recipe
               title={recipe.title}
               description={recipe.description}
               onClick={() => showModal(recipe.id)}
               key={i}
               onDelete={() => showConfirmModal(recipe.id)}
            />
         ))}
      </div>
   );
};

const LoggedOutHome = () => {
   return (
      <div className="home container">
         <h1 className="heading">Welcome to the Home Page</h1>
         <Link to="/signup" className="btn btn-primary btn-lg">
            Get Started
         </Link>
      </div>
   );
};

const Home = () => {
   const [logged] = useAuth();

   return <>{logged ? <LoggedInHome /> : <LoggedOutHome />}</>;
};

export default Home;
