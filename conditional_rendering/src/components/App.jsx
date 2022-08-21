import React from "react";
import Login from "./Login";

var isLoggedIn = false;

const currentTime = new Date(2022, 11, 1, 18).getHours();
console.log(currentTime);

function App() {
  return (
    <div className="container">
      {
        //Ternary operator
        // isLoggedIn ? <h1>Hello</h1> : <Login />

        // currentTime > 12 ? <h1>Why still working?</h1> : null

        //by using &&
        currentTime > 12 && <h1>Why still working?</h1>
      }
    </div>
  );
}

export default App;
