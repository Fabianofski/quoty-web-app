import React from "react";
import Sidebar from "./components/sidebar.js";
import './App.css';

function App() {
  return (
    <div className="App">

      <div className="header">
        <h3>QUOTY WEB APP</h3>
      </div>

      <div className="body">

        <div className="sidebar">  
          <Sidebar />
        </div>

        <div className="content">
          <p>Hello</p>
        </div>

      </div>
      
    </div>
    
  );
}
export default App;
