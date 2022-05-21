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
    const query = `https://us-central1-quoty-bot.cloudfunctions.net/app/api/latestEntries?database=${className}`;
    fetch(query, {mode:'cors'})
    .then(response => response.json())
    .then(fetchedData => {
      console.log(fetchedData);
      let tableData = [];
      fetchedData.forEach(element => {
        tableData.push(<Data username={element.UserName} start={element.Start} end={element.End} duration={element.Time}/>);
      });
      setData(tableData);
    });
  }, []);

  return(
    <div>
      <h2>{className}</h2> 
      <table>
        <thead>
          <tr className="headerTable">
            <td>USER</td>
            <td>START</td>
            <td>END</td>
            <td>DURATION</td>
          </tr>
        </thead>
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
