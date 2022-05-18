import React from "react";
import './Database.css';

function Database(){
    return(
      <div className="parent">
        <h1>Database</h1>
        <div className="Database">
          <Table className="Voicetime" page={1}/>
          <Table className="Deaftime"  page={1}/>
          <Table className="Mutetime"  page={1}/>
        </div>
      </div>
    );
}

function Table({className, page}){
  let data = [];
  for (let i = 0; i < 10; i++) {
    data.push(<Data start={"20.01.2020 18:05:36"} end={"20.01.2020 20:08:53"} duration={"02:02:17"}/>);
  }

  return(
    <div>
      <h2>{className}</h2>  
      <table className="table">
        {data}
      </table>
    </div>   
  );
}

function Data({start, end, duration}){
  return(
    <tr>
      <td>{start}</td>
      <td>{end}</td>
      <td>{duration}</td>
    </tr>
  );
    
}

export default Database;
