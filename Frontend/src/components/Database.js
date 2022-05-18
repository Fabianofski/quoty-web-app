import React from "react";
import Moment from "moment";
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
  const [data, setData] = React.useState(null);

  React.useEffect(() => {
    fetch(`/api/latestEntries?database=${className}`)
    .then(response => response.json())
    .then(data => {
      let tableData = [];
      data.forEach(element => {
        tableData.push(<Data username={element.UserName} start={element.Start} end={element.End} duration={element.Time}/>);
      });
      setData(tableData);
    })
  }, []);

  console.log(data);

  return(
    <div>
      <h2>{className}</h2>
      <table className="table">
        <tbody>
          <tr>
            <td>username</td>
            <td>start</td>
            <td>end</td>
            <td>duration</td>
          </tr>
        </tbody>
      </table>  
      <table className="table">
        <tbody>
          {data}
        </tbody>
      </table>
    </div>   
  );
}

function Data({username, start, end, duration}){
  Moment.locale('de');
  return(
    <tr>
      <td>{username}</td>
      <td>{Moment(start).format('DD.MM.yyyy HH:mm:ss')}</td>
      <td>{Moment(end).format('DD.MM.yyyy HH:mm:ss')}</td>
      <td>{duration}</td>
    </tr>
  );
    
}

export default Database;
