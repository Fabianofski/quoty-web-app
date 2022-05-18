import React, {useState} from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Sidebar from "./components/sidebar.js";
import './App.css';
import Database from "./components/Database.js";

const Home = () => <p>Home Content</p>;
const Account = () => <p>AccountContent</p>;
const NotFound = () => <p>404 not found</p>;

function App(){
  const [data, setData] = React.useState(null);

  React.useEffect(() => {
    fetch("/api")
      .then((res) => res.json())
      .then((data) => setData(data.message));
      console.log(data);
  }, []);

  return (
    <BrowserRouter>
      <div className="App">
        <div className="header">
          <h3>QUOTY - WEB - APP (WORK IN PROGRESS) {!data ? "Loading..." : data}</h3>
        </div>

        <div className="body">

          <div className="sidebar">  
          <Sidebar/>
          </div>

          <div className="content">
            <Routes>
              <Route exact path="/" element={<Home/>} />
              <Route exact path="/database" element={<Database/>} />
              <Route path="*" element={<NotFound/>} />
            </Routes>
          </div>
        </div>
      </div>  
    </BrowserRouter>
  );
}
export default App;

//ReactDOM.render(<App />, document.getElementById("root"));
