import React, { useState } from "react";

function CreateArea(props) {

  const [newToDo, setNewToDo] = useState({
    title: "",
    content:""
  });

  function addItem(event) {
    const {name, value} = event.target;
  
    setNewToDo(prevValue => {
      if (name === "title"){
        return {
          title : value,
          content : prevValue.content
      };
      } else if (name === "content") {
        return {
          title : prevValue.title,
          content : value
      };
      }
    });
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
        <input onChange={addItem} name="title" placeholder="Title" value={newToDo.title}/>
        <textarea onChange={addItem}  name="content" placeholder="Take a note..." rows="3" value={newToDo.content}/>
        <button onClick={addToList}>Add</button>
      </form>
    </div>
  );
}

export default CreateArea;
