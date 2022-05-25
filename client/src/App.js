import React, { useEffect, useState } from "react";

const App = () => {
   useEffect(() => {
      fetch("/recipe/hello")
         .then((res) => res.json())
         .then((data) => {
            console.log(data);
            setMessage(data.message);
         })
         .catch((err) => console.log(err));
   }, []);

   const [message, setMessage] = useState("");
   return <div>{message} </div>;
};
export default App;
