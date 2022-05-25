import React from "react";
import Moment from "moment";

function TableData({database}){
  const [data, setData] = React.useState([]);
  React.useEffect(() => {
    const query = `https://us-central1-quoty-bot.cloudfunctions.net/app/api/latestEntries?database=${database}&numberOfEntries=8`;
    fetch(query, {mode:'cors'})
    .then(response => response.json())
    .then(fetchedData => {
      console.log(fetchedData);
      let tableData = [];
      fetchedData.forEach(function(element, index){
        tableData.push(<Data 
          username={element.UserName}
          start={element.Start} end={element.End} duration={element.Time} 
          key={index}/>);
      });
      setData(tableData);
    });
  }, [database]);

  if(data.length > 0) return data;
  else return "Loading...";
}

function Data({username, start, end, duration}){
  return(
    <tr>
      <td>{username}</td>
      <td>{Moment(start).utc().format('DD.MM.yyyy HH:mm:ss')}</td>
      <td>{Moment(end).utc().format('DD.MM.yyyy HH:mm:ss')}</td>
      <td className="text-center">{duration}</td>
    </tr>
  );
  }

export default TableData;