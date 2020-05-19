import React from 'react';
import { Container, Form, FormCheck, Button } from "react-bootstrap";
import Switch from "react-switch";

class NewsSwitch extends React.Component {
  constructor() {
    super();
    this.state = { checked: false };
    this.handleChange = this.handleChange.bind(this);
  }
 
  handleChange(checked) {
    this.setState({ checked });
  }
 
  render() {

    return (
    	<div>
    	
      <label style={{marginTop:"10px"}}>
        <Switch onChange={this.handleChange} checked={this.state.checked} checkedIcon={false} uncheckedIcon={false} onColor={"#2097f2"} height={22} width={45}/>
      </label>
      </div>
    );
  }
}

export default NewsSwitch;