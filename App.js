import React, {useState} from 'react';
import logo from './logo.svg';
import ReactDOM from 'react-dom';
import './App.css';
import {Button, Card, Container, Row, Col, Navbar, Nav, Form, FormControl} from 'react-bootstrap';
import { NavLink,Switch as RouteSwitch, Route, Link, Redirect,useHistory } from 'react-router-dom';
import Select from 'react-select';
import News from './news.js';
import NewsSwitch from './components/newsswitch.js';
import AsyncSelect from 'react-select/lib/Async';
import Switch from "react-switch";
import _, {debounce} from 'lodash';
import {EmailShareButton, FacebookShareButton, TwitterShareButton,EmailIcon, FacebookIcon, TwitterIcon} from "react-share";
import Alert from 'react-bootstrap/Alert';
import Spinner from 'react-bootstrap/Spinner';
import { FaRegBookmark, FaBookmark } from "react-icons/fa";
import Fav from './fav.js';
import PageWithComments from './test_commentbox.js';
import ExpandCard from './expandCard.js';
import Search from './search.js';
import Overlay from 'react-bootstrap/Overlay';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import ToastHeader from 'react-bootstrap/ToastHeader';
import Toast from 'react-bootstrap/Toast';

/*
<Nav.Link as={Link} to="/technology">Technology</Nav.Link>
  <Nav.Link as={Link} to="/sports">Sports</Nav.Link>


 <Route exact path='/home' render={(props) => { if(this.state.switchDisplay == "none"){this.setState({switchDisplay:"flex", bookmarkIconClicked:false});} return <News tag="home" checked = {checked} />}}></Route>
    <Route exact path='/world' render={(props) => { if(this.state.switchDisplay == "none"){this.setState({switchDisplay:"flex", bookmarkIconClicked:false});} return <News tag="world" checked = {checked} />}}></Route>
    <Route exact path='/politics' render={(props) =>{ if(this.state.switchDisplay == "none"){this.setState({switchDisplay:"flex", bookmarkIconClicked:false});} return <News tag="politics" checked = {checked}/>}}></Route>
    <Route exact path='/business' render={(props) =>{ if(this.state.switchDisplay == "none"){this.setState({switchDisplay:"flex", bookmarkIconClicked:false});} return <News tag="business" checked = {checked} />}}></Route>
    <Route exact path='/technology' render={(props) =>{ if(this.state.switchDisplay == "none"){this.setState({switchDisplay:"flex", bookmarkIconClicked:false});} return <News tag="technology" checked = {checked}/>}}></Route>
    <Route exact path='/sports' render={(props) =>{ if(this.state.switchDisplay == "none"){this.setState({switchDisplay:"flex", bookmarkIconClicked:false});} return <News tag="sports" checked = {checked}/>}}></Route>
     <Route exact path="/favorites" render={(props) =>{this.handleSwitchDisplay(); return <Fav/>}}/>
     <Route exact path="/search" render={(props) =>{this.handleSwitchDisplay(); return <Search keyword={this.state.opt} />}} />
     <Route exact path="/:articles" render={(props) => {this.handleSwitchDisplay(); return <ExpandCard {...props}/>}}/>

*/


//import SelectBox from './components/selectbox.js';
/*
<AsyncSelect className="select-box" results={this.state.results} loadOptions={(inputValue, callback) => {
  setTimeout(() => {
    callback(filterColors(inputValue));
  }, 1000);
}}
*/

/*
const loadOptions = (inputValue, callback) => {
  setTimeout(() => {
    callback(filterColors(inputValue));
  }, 1000);
};

*/
/*
<span style={{visibility:"hidden", display:"flex"}}>
 &nbsp;&nbsp;&nbsp;&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp</span>
  <Link to="/favorites" >
  { !this.state.bookmarkIconClicked &&
  <FaRegBookmark size={20} style={{color:"white"}} onClick={()=>{this.setState({bookmarkIconClicked:true})}} >
  </FaRegBookmark>
  }
  { this.state.bookmarkIconClicked &&
    <FaBookmark size={20} style={{color:"white"}} >
  </FaBookmark>
  }
  </Link>
  <span style={{visibility:"hidden", display:"flex"}}>
 &nbsp;&nbsp;</span>
 */
 // onInputChange={this.handleSearchChange} 

var switchDisplay;
var curPath = window.location.href.substring(22,);
  if (curPath == "" || curPath == "world" || curPath == "politics" || curPath == "business" || curPath=="technology" || curPath=="sports"){

      switchDisplay = "inlineBlock";

  }
  else{
 
      switchDisplay="none";
   }

const cors = require('cors');

//[{value:"choco", labe:"choco", style: { color: 'black' }}]
const scaryAnimals = [
  { label: "Alligators", value: 1, style: { color: 'black' }},
  { label: "Crocodiles", value: 2 },
  { label: "Sharks", value: 3 },
  { label: "Small crocodiles", value: 4 },
  { label: "Smallest crocodiles", value: 5 },
  { label: "Snakes", value: 6 }
];

const myOpts = [];


//options={scaryAnimals}
class Navigation extends React.Component{
     state = {
    selectedOption: null,
    results: [], selectedResult: null
  };
   constructor(props) {
     const storageObj = JSON.parse(localStorage.getItem('storageObj')) || JSON.stringify({'check_local': false});
    super(props);



    //var retrievedObject = localStorage.getItem('storageObj'); 
   
    var retrieve = storageObj.check_local;//JSON.parse(storageObj);

   

    this.state = { 
      checked: retrieve,
      bookmarkIconClicked: false ,
      select:0,
      switchDisplay: "flex",
      dis:true,
      opt: "",
      optChange:false
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleLoad = this.handleLoad.bind(this);
    this.handleFetch = this.handleFetch.bind(this);
    this.handleSwitchDisplay = this.handleSwitchDisplay.bind(this);
    this.filter = this.filter.bind(this);
    this.handleOnChange = this.handleOnChange.bind(this);
     //this.loadingOnclick = this.loadingOnclick.bind(this);

  }
/*
loadingOnclick = () => {
    this.setState({ loading: true });

    //Faking API call here
    setTimeout(() => {
      this.setState({ loading: false });
    }, 5000);
  };

*/
  handleChange(checked) {
    
    this.setState({ checked:checked});
    
    var updateObj = {'check_local': checked};
 
   localStorage.setItem('storageObj', JSON.stringify(updateObj)); 


}

handleOnChange(opt){
  this.setState({
    opt:opt.label,
    optChange:true
  });

}



handleSwitchDisplay(){
  

  
    if (this.state.switchDisplay == "flex"){
      this.setState({
        switchDisplay:"none"
      });
  }
  
  
}


  //componentDidMount(){
   // window.location.reload();
  //}

/*
 handleSearchChange = async (event, { value }) => {
  this.setState(
      { selectedOption }
    try {
      const response = await fetch(
        `https://api.cognitive.microsoft.com/bing/v7.0/suggestions?q={`+value+'}',
        {
          headers: {
            "Ocp-Apim-Subscription-Key": "4f89d1f3aee9499886e59fdb16df1a6c"
          }
        }
      );
      const data = await response.json();
      
      const resultsRaw = data.suggestionGroups[0].searchSuggestions;
      const results = resultsRaw.map(result => ({ title: result.displayText, url: result.url }));
      console.log(results);
    } catch (error) {
      console.error(`Error fetching search ${value}`);
    }
  };
*/
/*
<AsyncSelect className="select-box" results={this.state.results} loadOptions={(inputValue, callback) => {
  setTimeout(() => {
    callback(filterColors(inputValue));
  }, 1000);
}} onInputChange={this.handleSearchChange}  placeholder="Enter Keyword.." />
*/

handleSearchChange = (selectedOption) => {
  this.setState(
      { selectedOption : selectedOption}
      );
};

handleFetch = async(selectedOption) => { 
  //if (selectedOption != this.state.selectedOption){
      //() => console.log(`Option selected:`, this.state.selectedOption)
  //console.log("data");
  var results = [];
    var val = selectedOption;
      try {
      const response = await fetch(
        `https://api.cognitive.microsoft.com/bing/v7.0/suggestions?q={`+this.state.selectedOption+'}',
        {
          headers: {
            "Ocp-Apim-Subscription-Key": "e10aec8d66b841b0b14cc9ce73fcd24d"
          }
        }
      );
      //e10aec8d66b841b0b14cc9ce73fcd24d
      //4f89d1f3aee9499886e59fdb16df1a6c
      const data = await response.json();
      const resultsRaw = data.suggestionGroups[0].searchSuggestions;
      var i;
      //console.log(resultsRaw.length);
      for(i=0; i < resultsRaw.length; i++){
          var content = {"label":resultsRaw[i].displayText};
          results.push(content);
      }
      //console.log(results);
      return  results;
     //const results =  resultsRaw.map(result => ({ label: result.displayText })); //({ title: result.displayText, url: result.url }));
      //this.setState({ results });

     //console.log(results.filter(i =>i.label.toLowerCase().includes(selectedOption.toLowerCase())));
      //return results.filter(i =>i.label.toLowerCase().includes(selectedOption.toLowerCase()));
     
    } catch (error) {
      console.error(`Error fetching search value`);
    }
};

handleLoad = (inputValue, callback) => {
    //console.log(inputValue);
    //this.handleFetch(inputValue); 

   return setTimeout(async() => {
    const test = await this.filter(inputValue);
    //console.log("handleLoad");
     //console.log(test);
      callback(test);
     
    }, 1000);
//this.filter(inputValue);
  };

 filter = async(inputValue: string) => {
      
  var val = [];

    if (inputValue == this.state.selectedOption){   
       val = await this.handleFetch(inputValue);
     

    }
    
    return val;
    //else{
      //return [];
    //}
    //if (inputValue == this.state.selectedOption){
          //return this.state.results.filter(i =>
            //i.label.toLowerCase().includes(inputValue.toLowerCase())
           //);
     // }
      //else{
        //return [];
      //}


};

//_.debounce(this.handleSearchChange, 1000,  leading: true})

  render(){
var curPath = window.location.href.substring(22,);
  
    const {checked, loading, selectedOption} = this.state;
//const [checked, setChecked] = useState(0);
    const textStyle={
      fontSize:"15px",
      color:"white",
      marginRight:"12px",
      marginBottom:"3px"
    };
    const textStyle2={
      fontSize:"15px",
      color:"white",
      marginLeft:"10px",
      marginBottom:"3px"
    };

    
//if (this.state.optChange){
  // return <Redirect to='/search'/>;
//}

if (this.state.redirect) {
       return <div><Redirect to='/favorites'/><Fav/></div>;
     }



    return(
  <div>
  <Navbar className="navbar-color" bg="dark"  variant="dark" expand="lg">
  <AsyncSelect className="select-box" noOptionsMessage={()=>{return "No Match"}} results={this.state.results} onInputChange={this.handleSearchChange} loadOptions={this.handleLoad}  onChange={(opt)=>this.handleOnChange(opt )} placeholder="Enter Keyword.." />
 
 <Navbar.Toggle aria-controls="basic-navbar-nav" />
   <Navbar.Collapse id="basic-navbar-nav">
  <Nav className="mr-auto" >
  <Nav.Link  href="/" >Home</Nav.Link>
  <Nav.Link href="/world" >World</Nav.Link>
  <Nav.Link href="/politics" >Politics</Nav.Link>
  <Nav.Link href="/business">Business</Nav.Link>
  <Nav.Link href="/technology">Technology</Nav.Link>
  <Nav.Link href="/sports">Sports</Nav.Link>
  </Nav>

  <Row >
    <Col lg={(this.state.switchDisplay == "none")?{span: 1, offset: 11}:{span: 1, offset: 7}} >
      <Link to="/favorites" >
      { !this.state.bookmarkIconClicked &&
      <OverlayTrigger placement="bottom" overlay={<Tooltip id="tooltip-disabled">Bookmark</Tooltip>}>
      <FaRegBookmark size={20} style={{color:"white"}} onClick={()=>{this.setState({bookmarkIconClicked:true})}} >
      </FaRegBookmark>
      </OverlayTrigger>
      }
      { this.state.bookmarkIconClicked &&
        <FaBookmark size={20} style={{color:"white"}} >
      </FaBookmark>
      }
      </Link>
    </Col>
    <Col lg="auto" style={{display:this.state.switchDisplay}}>
      <span style={{fontSize:"15px",color:"white"}}>NYTimes</span>
    </Col>
    <Col lg={1} style={{display:this.state.switchDisplay}}>
       <label >
        <Switch onChange={this.handleChange} checked={this.state.checked} checkedIcon={false} uncheckedIcon={false} onColor={"#2097f2"} height={18} width={42}/>
      </label>
    </Col>
    <Col lg={1} style={{display:this.state.switchDisplay}}>
      <span style={{fontSize:"15px", color:"white"}}>Guardian</span>
    </Col>
    
  </Row>
  
 </Navbar.Collapse>

 


 

{this.state.optChange &&
  <Redirect to='/search'/>
}





</Navbar>

 <RouteSwitch >
    <Route exact path='/' component={() => <News tag="home" checked = {checked} />} ></Route>
    <Route exact path='/world' component={() =>  <News tag="world" checked = {checked} />}></Route>
    <Route exact path='/politics' component={() => <News tag="politics" checked = {checked}/>}></Route>
    <Route exact path='/business' component={() => <News tag="business" checked = {checked} />}></Route>
    <Route exact path='/technology' component={() =><News tag="technology" checked = {checked}/>}></Route>
    <Route exact path='/sports' component={() => <News tag="sports" checked = {checked}/>}></Route>
     <Route exact path="/favorites" render={(props) =>{this.handleSwitchDisplay();  return <Fav/>}}/>
     <Route exact path="/search" render={(props) =>{this.handleSwitchDisplay(); if (this.state.bookmarkIconClicked == true) {this.setState({bookmarkIconClicked:false});}  return <Search keyword={this.state.opt} />}} />
     <Route exact path="/:articles" render={(props) => {this.handleSwitchDisplay(); if (this.state.bookmarkIconClicked == true) {this.setState({bookmarkIconClicked:false});} return <ExpandCard {...props}/>}}/>
  </RouteSwitch>
  </div>
);
}
}

 




// <Select className="select-box" options={scaryAnimals} placeholder="Enter Keyword.." />
//"917c08bb69d34a30a95f237a1832b1a3"
//`https://api.cognitive.microsoft.com/bing/v7.0/suggestions?mkt=fr-FR&q=${inputValue}`,
//'https://api.cognitive.microsoft.com/bing/v7.0/suggestions?q=${inputValue}',
//function App() {
class App extends React.Component{

 constructor(props) {
    super(props);
    this.state = {
      inputValues: []
    }
  }
  
  
   handleInputChange = inputValue => {
    this.setState({
      inputValues : [{label: inputValue, value: inputValue}]
    });
    return inputValue;
  };
  





render()
{ 
  //inputValues = inputValues.concact([{label: "yo", value: "yo"}]);

  return (

<div>
<Navigation />



 

</div>
    
  );

}
}




export default App;

