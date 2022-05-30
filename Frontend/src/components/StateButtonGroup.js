import React from "react";
import classNames from "classnames";
import 
{
  Button,
  ButtonGroup,
} from "reactstrap";

function StateButtonGroup({state, setState, types}){
  return(
    <ButtonGroup
      className="btn-group-toggle float-right"
      data-toggle="buttons">
      {types.map((element, index) => (
        <GroupButton state={state} setState={setState} type={element} key={index}/>
      ))}
    </ButtonGroup>
  );

  function GroupButton({state, setState, type}){
    return(
      <Button
        color="info"
        id="2"
        size="sm"
        tag="label"
        className={classNames("btn-simple", {
          active: state === type,
        })}
        onClick={() => setState(type)}
      >
        <span className="d-none d-sm-block d-md-block d-lg-block d-xl-block">
          {type}
        </span>
        <span className="d-block d-sm-none">
          <i className="tim-icons icon-tap-02" />
        </span>
      </Button>
    );
  }
}

export default StateButtonGroup;