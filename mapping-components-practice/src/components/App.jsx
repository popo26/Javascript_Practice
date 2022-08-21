import React from "react";
import Each from "./Each";
import emojipedia from "../emojipedia:wq!";

function createEmoji(item){
  return (
    <Each 
      key = {item.id}
      emoji = {item.emoji}
      name = {item.name}
      meaning = {item.meaning}
    />
  );
};

function App() {
  return (
    <div>
      <h1>
        <span>emojipedia</span>
      </h1>

      <dl className="dictionary">
      {emojipedia.map(createEmoji)}
       
      </dl>
    </div>
  );
}

export default App;
