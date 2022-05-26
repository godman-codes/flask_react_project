import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/main.css";
import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import SignUp from "./components/SignUp";
import Login from "./components/Login";
import CreateRecipe from "./components/CreateRecipe";

const App = () => {
   return (
      <Router>
         <Navbar />
         <Routes>
            <Route path="/create_recipe" element={<CreateRecipe />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/" element={<Home />} />
         </Routes>
      </Router>
   );
};
export default App;
