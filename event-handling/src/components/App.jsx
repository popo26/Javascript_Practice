import React, { useState } from "react";

function App() {

  const [headingText, setHeadingText] = useState("Hello");
  const [isMousedOver, setMouseOver] = useState(false);
 
  function handleClick() {
    setHeadingText("Submitted");
  }

  function changeColour() {
    setMouseOver(true);
  }

  function revertColour() {
    setMouseOver(false);
  }

  return (
    <div className="container">
      <h1>{headingText}</h1>
      <input type="text" placeholder="What's your name?" />
      <button 
      style = {{ backgroundColor: isMousedOver ? "black": "white"}}
      onClick={handleClick}
      onMouseOver = {changeColour}
      onMouseOut = {revertColour}
      >Submit</button>
    </div>
  );
}

export default App;
