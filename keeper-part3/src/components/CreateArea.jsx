import React, { useState } from "react";

function CreateArea(props) {

  const [newToDo, setNewToDo] = useState({
    title: "",
    content:""
  });

  function handleChange(event) {
    const {name, value} = event.target;
  
    setNewTodo(prevValue => {
      return {
        ...prevValue,
        [name]: value
      };
    });

    //Another way
    // setNewToDo(prevValue => {
    //   if (name === "title"){
    //     return {
    //       title : value,
    //       content : prevValue.content
    //   };
    //   } else if (name === "content") {
    //     return {
    //       title : prevValue.title,
    //       content : value
    //   };
    //   }
    // });
  }

  function addToList(event){
    props.onAdd(newToDo);
    setNewToDo({
      title: "",
      content: ""
    })
    event.preventDefault();
  }

  
  return (
    <div>
      <form>
        <input onChange={handleChange} name="title" placeholder="Title" value={newToDo.title}/>
        <textarea onChange={handleChange}  name="content" placeholder="Take a note..." rows="3" value={newToDo.content}/>
        <button onClick={addToList}>Add</button>
      </form>
    </div>
  );
}

export default CreateArea;
