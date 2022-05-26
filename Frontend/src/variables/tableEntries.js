import React from "react";
import Moment from "moment";

function TableData({database, avatarUrls}){
  const [data, setData] = React.useState([]);

  React.useEffect(() => {
    const query = `https://us-central1-quoty-bot.cloudfunctions.net/app/api/latestEntries?database=${database}&numberOfEntries=8`;
    fetch(query, {mode:'cors'})
    .then(response => response.json())
    .then(fetchedData => {
      let tableData = [];
      fetchedData.forEach(function(element, index){
        tableData.push(<Data 
          username={element.UserName}
          userID={element.UserID}
          avatarUrls={avatarUrls}
          start={element.Start} end={element.End} duration={element.Time} 
          key={index}/>);
      });
      setData(tableData);
    });
  }, [database, avatarUrls]);

  if(data.length > 0) return ( <tbody>{data}</tbody>);
  else return (<tbody><tr><td>Loading...</td></tr></tbody>);
}



function Data({username, userID, avatarUrls, start, end, duration}){
  let url= "";
  if(avatarUrls.hasOwnProperty(userID)) url = avatarUrls[userID];
  return(
    <tr>
      <td><img src={url} width="30" height="30" alt="" className="discord-avatar"/>{username}</td>
      <td>{Moment(start).utc().format('DD.MM.yyyy HH:mm:ss')}</td>
      <td>{Moment(end).utc().format('DD.MM.yyyy HH:mm:ss')}</td>
      <td className="text-center">{duration}</td>
    </tr>
  );
  }

export default TableData;