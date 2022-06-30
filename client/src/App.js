import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/main.css";
import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import SignUp from "./components/SignUp";
import Login from "./components/Login";
import CreateRecipePage from "./components/CreateRecipePage";

const App = () => {
   return (
      <Router>
         <Navbar />
         <Routes>
            <Route path="/create_recipe" element={<CreateRecipePage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/" element={<Home />} />
         </Routes>
      </Router>
   );
};
export default App;
