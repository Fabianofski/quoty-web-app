import React from "react";
import Moment from "moment";
import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Table,
  Col,
} from "reactstrap";

function Ranking({database, avatarUrls}){

  const [data, setData] = React.useState([]);

  React.useEffect(() => {
    const query = `https://us-central1-quoty-bot.cloudfunctions.net/app/api/Ranking?database=${database}`;
    fetch(query, {mode:'cors'})
    .then(response => response.json())
    .then(fetchedData => {
      let tableData = [];
      fetchedData.forEach(function(element, index){
        tableData.push(<Data 
          username={element.Username}
          userID={element.UserID}
          time={element.Time}
          avatarUrls={avatarUrls}
          index={index}
          key={index}/>);
      });
      setData(tableData);
    });
  }, [database, avatarUrls]);

  return(
    <Col >
      <Card >
        <CardHeader>
          <CardTitle tag="h4">Ranking {database}</CardTitle>
        </CardHeader>
        <CardBody>
        <Table responsive>
          <thead className="text-primary">
            <tr>
              <th>Username</th>
              <th className="text-center">Total Time</th>
            </tr>
          </thead>
          <tbody>
          {data}
          </tbody>
        </Table>
        </CardBody>
      </Card>
    </Col>
  );
}

function Data({username, userID, time, index, avatarUrls}){
  let url= "";
  if(avatarUrls.hasOwnProperty(userID)) url = avatarUrls[userID];
  return(
    <tr>
      <td>{index + 1}.<img src={url} width="30" height="30" alt="" className="discord-avatar"/>{username}</td>
      <td className="text-center">{formatHHmmss(time)}</td>
    </tr>
  );
}

function formatHHmmss(time){
  let split = time.split(':');
  const seconds = split[2];
  const minutes = split[1];
  let hours = split[0];
  const days = Math.floor(hours / 24);
  hours = hours - days * 24;

  let dayStr = ''
  if(days > 1)
    dayStr = `${days} days, `
  else if(days === 1)
    dayStr = `${days} day, `
  
  return `${dayStr}${hours}:${minutes}:${seconds}`;
}

export default Ranking;