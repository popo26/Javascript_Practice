import React, { useState } from "react";



function App() {

  const [name, setName] = useState("");
  const [headingText, setHeading] = useState("");

  function handleChange(event) {
    console.log(event.target.value);
    // console.log(event.target.placeholder);
    // console.log(event.target.type);
    setName(event.target.value);
  }

  function handleClick(event){
    setHeading(name);

    event.preventDefault();
  }

  return (
    <div className="container">
      <h1>Hello {headingText} </h1>
      <form onSubmit={handleClick}>
      <input 
      onChange={handleChange} 
      type="text" 
      placeholder="What's your name?"
      //Controlled Components
      ////https://reactjs.org/docs/forms.html#controlled-components
      value={name} />
      <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default App;
