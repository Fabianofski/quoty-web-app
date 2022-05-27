/*!

=========================================================
* Black Dashboard React v1.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/black-dashboard-react
* Copyright 2020 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/black-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/

import React from "react";
import TableData from "variables/tableEntries";
import Ranking from "variables/ranks";
import StateButtonGroup from "components/StateButtonGroup";
// reactstrap components
import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Table,
  Row,
  Col,
} from "reactstrap";

// core components
import LineGraph from "variables/charts.js";

function Dashboard() {
  const [bigChartState, setbigChartState] = React.useState("Voicetime");
  const [timeInterval, setTimeInterval] = React.useState("week");

  const [bigTableState, setbigTableState] = React.useState("Voicetime");

  const [avatarUrls, setAvatarUrls] = React.useState({});
  React.useEffect(() => {
    const query = `https://us-central1-quoty-bot.cloudfunctions.net/app/api/getAllUsers`;
    fetch(query, {mode:'cors'})
    .then(response => response.json())
    .then(fetchedData => {
      setAvatarUrls(fetchedData);
    })
  }, []);

  return (
    <>
      <div className="content">
        <Row>
          <Col xs="12">
            <Card className="card-chart">
              <CardHeader>
                <Row>
                  <Col className="text-left">
                    <h5 className="card-category">{bigChartState.toUpperCase()}</h5>
                    <CardTitle tag="h2">LAST {timeInterval.toUpperCase()}S</CardTitle>
                  </Col>
                  <Col sm="8">
                    <StateButtonGroup state={timeInterval} setState={setTimeInterval} types={["day", "week", "month"]}/>
                  </Col>
                  <Col>
                    <StateButtonGroup state={bigChartState} setState={setbigChartState} types={["Voicetime", "Mutetime", "Deaftime"]}/>
                  </Col>
                </Row>
              </CardHeader>
              <CardBody>
                <div className="chart-area">
                  <LineGraph
                    database={bigChartState}
                    timeInterval={timeInterval}
                  />
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
        <Row>
          <Ranking avatarUrls={avatarUrls} database = {"Voicetime"}/>
          <Ranking avatarUrls={avatarUrls} database = {"Mutetime"}/>
          <Ranking avatarUrls={avatarUrls} database = {"Deaftime"}/>
        </Row>
        <Row>
          <Col>
            <Card>
              <CardHeader>
                <Row>
                  <Col sm="6">
                    <CardTitle tag="h4">Last Entries: {bigTableState.toUpperCase()}</CardTitle>
                  </Col>
                  <Col sm="6">
                    <StateButtonGroup state={bigTableState} setState={setbigTableState} types={["Voicetime", "Mutetime", "Deaftime"]}/>
                  </Col>
                </Row>
              </CardHeader>
              <CardBody>
                <Table className="tablesorter" responsive>
                  <thead className="text-primary">
                    <tr>
                      <th>Username</th>
                      <th>Start</th>
                      <th>End</th>
                      <th className="text-center">Duration</th>
                    </tr>
                  </thead>
                  <TableData database={bigTableState} avatarUrls={avatarUrls}/>
                </Table>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default Dashboard;
