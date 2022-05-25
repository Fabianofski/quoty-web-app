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
// nodejs library that concatenates classes
import classNames from "classnames";
// react plugin used to create charts
import { Line, Bar } from "react-chartjs-2";
import TableData from "variables/tableEntries";
// reactstrap components
import 
{
  Button,
  ButtonGroup,
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  Label,
  FormGroup,
  Input,
  Table,
  Row,
  Col,
  UncontrolledTooltip,
} from "reactstrap";

// core components
import LineGraph from "variables/charts.js";

function Dashboard(props) {
  const [bigChartState, setbigChartState] = React.useState("Voicetime");

  const [bigTableState, setbigTableState] = React.useState("Voicetime");

  return (
    <>
      <div className="content">
        <Row>
          <Col xs="12">
            <Card className="card-chart">
              <CardHeader>
                <Row>
                  <Col className="text-left" sm="6">
                    <h5 className="card-category">{bigChartState.toUpperCase()}</h5>
                    <CardTitle tag="h2">Last Weeks</CardTitle>
                  </Col>
                  <Col sm="6">
                    <ButtonGroup
                      className="btn-group-toggle float-right"
                      data-toggle="buttons"
                    >
                      <Button
                        tag="label"
                        className={classNames("btn-simple", {
                          active: bigChartState === "Voicetime",
                        })}
                        color="info"
                        id="0"
                        size="sm"
                        onClick={() => setbigChartState("Voicetime")}
                      >
                        <span className="d-none d-sm-block d-md-block d-lg-block d-xl-block">
                          Voicetime
                        </span>
                        <span className="d-block d-sm-none">
                          <i className="tim-icons icon-single-02" />
                        </span>
                      </Button>
                      <Button
                        color="info"
                        id="1"
                        size="sm"
                        tag="label"
                        className={classNames("btn-simple", {
                          active: bigChartState === "Mutetime",
                        })}
                        onClick={() => setbigChartState("Mutetime")}
                      >
                        <span className="d-none d-sm-block d-md-block d-lg-block d-xl-block">
                          Mutetime
                        </span>
                        <span className="d-block d-sm-none">
                          <i className="tim-icons icon-gift-2" />
                        </span>
                      </Button>
                      <Button
                        color="info"
                        id="2"
                        size="sm"
                        tag="label"
                        className={classNames("btn-simple", {
                          active: bigChartState === "Deaftime",
                        })}
                        onClick={() => setbigChartState("Deaftime")}
                      >
                        <span className="d-none d-sm-block d-md-block d-lg-block d-xl-block">
                          Deaftime
                        </span>
                        <span className="d-block d-sm-none">
                          <i className="tim-icons icon-tap-02" />
                        </span>
                      </Button>
                    </ButtonGroup>
                  </Col>
                </Row>
              </CardHeader>
              <CardBody>
                <div className="chart-area">
                  <LineGraph
                    database={bigChartState}
                  />
                </div>
              </CardBody>
            </Card>
          </Col>
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
                    <ButtonGroup
                      className="btn-group-toggle float-right"
                      data-toggle="buttons"
                    >
                      <Button
                        tag="label"
                        className={classNames("btn-simple", {
                          active: bigTableState === "Voicetime",
                        })}
                        color="info"
                        id="0"
                        size="sm"
                        onClick={() => setbigTableState("Voicetime")}
                      >
                        <span className="d-none d-sm-block d-md-block d-lg-block d-xl-block">
                          Voicetime
                        </span>
                        <span className="d-block d-sm-none">
                          <i className="tim-icons icon-single-02" />
                        </span>
                      </Button>
                      <Button
                        color="info"
                        id="1"
                        size="sm"
                        tag="label"
                        className={classNames("btn-simple", {
                          active: bigTableState === "Mutetime",
                        })}
                        onClick={() => setbigTableState("Mutetime")}
                      >
                        <span className="d-none d-sm-block d-md-block d-lg-block d-xl-block">
                          Mutetime
                        </span>
                        <span className="d-block d-sm-none">
                          <i className="tim-icons icon-gift-2" />
                        </span>
                      </Button>
                      <Button
                        color="info"
                        id="2"
                        size="sm"
                        tag="label"
                        className={classNames("btn-simple", {
                          active: bigTableState === "Deaftime",
                        })}
                        onClick={() => setbigTableState("Deaftime")}
                      >
                        <span className="d-none d-sm-block d-md-block d-lg-block d-xl-block">
                          Deaftime
                        </span>
                        <span className="d-block d-sm-none">
                          <i className="tim-icons icon-tap-02" />
                        </span>
                      </Button>
                    </ButtonGroup>
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
                  <tbody>
                    <TableData database={bigTableState}/>
                  </tbody>
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
