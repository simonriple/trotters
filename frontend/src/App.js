import { useState } from "react";
import "./App.css";
import { CanvasContainer } from "./components/Canvas";
import { City } from "./components/City";

function App() {
  return (
    <div className="App">
      
        <CanvasContainer />
        <City />
    </div>
  );
}

export default App;
