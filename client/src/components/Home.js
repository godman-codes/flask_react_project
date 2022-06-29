import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../auth";

const LoggedInHome = () => {
   return (
      <div className="recipes">
         <h1>List of Recipes</h1>
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
