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
    fetch(`https://us-central1-quoty-bot.cloudfunctions.net/app/api/latestEntries?database=${className}`)
    .then(response => response.json())
    .then(data => {
      console.log(data);
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
      <table>
        <tr className="headerTable">
          <td>USER</td>
          <td>START</td>
          <td>END</td>
          <td>DURATION</td>
        </tr>
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
