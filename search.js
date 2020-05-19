import React, {useState, useEffect} from 'react';
import ReactDOM from 'react-dom';
import {Badge,Button, Card, Container, Row, Col, Navbar, Nav, Form, FormControl} from 'react-bootstrap';
import { NavLink,Switch as RouteSwitch, Route, Link, Redirect,useHistory } from 'react-router-dom';
import {EmailShareButton, FacebookShareButton, TwitterShareButton,EmailIcon, FacebookIcon, TwitterIcon} from "react-share";
import Select from 'react-select';
import News from './news.js';
import { IoMdShare } from "react-icons/io";
import Modal from 'react-bootstrap/Modal';
import Overlay from 'react-bootstrap/Overlay';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import ToastHeader from 'react-bootstrap/ToastHeader';
import Toast from 'react-bootstrap/Toast';
import {FaTrash} from "react-icons/fa";
import { ToastContainer, toast } from 'react-toastify';


const colorMap = new Map()
colorMap.set('WORLD', '#7c56fb');
colorMap.set('POLITICS', '#459488');
colorMap.set('BUSINESS', '#4a98e9');
colorMap.set('TECHNOLOGY', '#cfdb49');
colorMap.set('SPORTS', '#f5c150');
colorMap.set('HEALTH', '#6e757c');
colorMap.set('GUARDIAN', '#152949');
colorMap.set('NYTIMES', '#dddddd');

const fontColorMap = new Map()
fontColorMap.set('WORLD', 'white');
fontColorMap.set('POLITICS', 'white');
fontColorMap.set('BUSINESS', 'white');
fontColorMap.set('TECHNOLOGY', 'black');
fontColorMap.set('SPORTS', 'black');
fontColorMap.set('HEALTH', 'white');
fontColorMap.set('GUARDIAN', 'white');
fontColorMap.set('NYTIMES', 'black');


function Example(props) {
  const [show, setShow] = useState(false);


  const handleClose = () => {setShow(false);}
  const handleShow = () => setShow(true);

  useEffect(
  () => {
    setShow(props.showm)
  },
  [props.showm]
)

  const headStyle ={
    fontColor:"red",
    marginLeft:"auto",
    marginRight:"auto",
    textAlign:"center"
  }
  var tagArr = ['CSCI_571_NewsApp'];

  return (
    <>
      

      <Modal show={show} onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>{props.head}</Modal.Title>
        </Modal.Header>
        <Modal.Body><h4 style={headStyle}>Share via</h4>
        <Row>
        <Col style={{textAlign:"center"}}>
        <FacebookShareButton  url={props.url} hashtag="#CSCI_571_NewsApp" >
            <FacebookIcon size={60} round />
          </FacebookShareButton>
          </Col>
          <Col style={{textAlign:"center"}}>
           <TwitterShareButton   url={props.url} hashtags={tagArr} >
            <TwitterIcon size={60} round />
          </TwitterShareButton>
          </Col>
          <Col style={{textAlign:"center"}}>
          <EmailShareButton   url={props.url} subject='#CSCI_571_NewsApp' body="">
            <EmailIcon size={60} round />
          </EmailShareButton>
          </Col>
          </Row>
        </Modal.Body>
        
      </Modal>
    </>
  );
}





class Search extends React.Component{
	 constructor(props) {
      super(props);
       this.state = {
      titleList : [],
      dateList : [],
      imgList : [],
      sectionList: [],
      urlList:[],
      sourceList:[],
      showm:false,
     showT:"",
     showURL:"",
      currentCard: 0 ,
      expandflag:false,
      article_idList:[],
      article_urlList:[],
      checkedList:[]
  	}
  }



   componentDidMount() {

    var url = 'https://node-shiuanchhw8.wl.r.appspot.com/getResults/' + this.props.keyword;
    
    fetch(url)
    .then((response) => {
   
    return response.text();//.json(); 
    }).then((data_str) => {

       var data_arr = JSON.parse(data_str);
       
       var titleList = [];
	   var  dateList = [];
	   var imgList = [];
	   var sectionList = [];
  		var urlList = [];
  		var sourceList = [];
  		var article_idList = [];
  		var article_urlList = [];
  		var checkedList = [];
  		var j;
  		for(j=0;j < data_arr.length;j++){
  			var title = data_arr[j].title;
      		if (data_arr[j].title.length > 60){
        		title =  title.substring(0,60);
        		var check_i = title.length-1;
        		while(title[check_i] != " "){
          			check_i -= 1;
        		}
        		title = title.substring(0, check_i)+"...";
      		}
      		titleList.push(title);

      		if (data_arr[j].source == "GUARDIAN"){
      			checkedList.push(true);
      		}
      		else{
      			checkedList.push(false);
      		}
  		}



  		var i;
  		for(i=0;i < data_arr.length;i++){
    	
    	dateList.push(data_arr[i].date);
    	imgList.push(data_arr[i].imgs);
    	sectionList.push(data_arr[i].section);
      urlList.push(data_arr[i].url);
      sourceList.push(data_arr[i].source);
      article_idList.push(data_arr[i].article_id);
      article_urlList.push(data_arr[i].article_url);
      
    	}
    	this.setState({
   			titleList: titleList,
   			dateList: dateList,
            imgList: imgList, //jsonData.results[0].multimedia[0].url,
           sectionList:sectionList,
           urlList:urlList,
           sourceList:sourceList,
           article_idList:article_idList,
           article_urlList:article_urlList,
           checkedList:checkedList
          });
       this.createCards = this.createCards.bind(this);
       this.cardOnclick = this.cardOnclick.bind(this);
       this.toggleModal = this.toggleModal.bind(this);
    
  }).catch((err) => {
    console.log('錯誤:', err);
  });

   }

   cardOnclick(cardIdx){


  this.setState({
    currentCard:cardIdx,
    expandflag:true
  });


}
toggleModal(showm, showT, showURL) {
    this.setState({ 
      showm:showm,
      showT:showT,
      showURL:showURL
     });


} 

   createCards(){
   	 const dateStyle = {
        fontStyle:"italic",
        fontWeight: "450",
        fontSize:"12px",
      float:"left"

      };
     
      const cardTitleStyle = {
        display:"block",
        fontSize: "14px",
        fontStyle:"italic"
      };

      const imgStyle2 = {
        padding:"2px",
        borderStyle:"solid",
        borderRadius:"5px",
        borderWidth:"1px",
        borderColor:"#ececec"
      }


   	let cardsList = [];
    var i;
    for(i=0;i < this.state.titleList.length; i++){


    	cardsList.push(
      <Col lg={3}>
      <Card style={{ marginBottom:"10px", marginLeft:"5px",marginRight:"5px", boxShadow: "0 4px 8px 0 rgba(0,0,0,0.2)",cursor: "pointer", height:"34rem"}}  >
       
    	<Card.Body>
		  <Card.Title style={cardTitleStyle}><b>{this.state.titleList[i]}</b><IoMdShare  onClick={this.toggleModal.bind(this, true,this.state.titleList[i], this.state.urlList[i] )} ></IoMdShare></Card.Title>
		   <div onClick={this.cardOnclick.bind(this, i)}>
		
		  <img  src={this.state.imgList[i]} style={imgStyle2} width="100%" />
		 
		    <Card.Text>
		    <span className="date" style={dateStyle}>{this.state.dateList[i]}</span> 

          	<Badge style={{float:"right",marginRight:"5px",borderRadius:"5px",fontSize:"10px",backgroundColor: colorMap.get(this.state.sectionList[i]),color: fontColorMap.get(this.state.sectionList[i])}}>{this.state.sectionList[i]}</Badge>  
      		</Card.Text>
      		</div>
		  </Card.Body>
		</Card>
    </Col>
    	)	
    }
    var List = [];
    List.push(<div>{cardsList}</div>);
    return List;
   }

render(){
	var currentCard = this.state.currentCard
      if (this.state.expandflag){
        return  <Redirect to={{pathname:'/articles?id='+this.state.article_idList[currentCard], state:{"article_id": this.state.article_idList[currentCard], "article_url": this.state.article_urlList[currentCard], "section": this.state.sectionList[currentCard], "url":this.state.urlList[currentCard], "checked":this.state.checkedList[currentCard], "img": this.state.imgList[currentCard]}}} />;
       
      }
      else if (this.state.titleList.length > 0){
   			return(
          <div>
          <h1 style={{fontSize:"25px", marginLeft:"12px"}}>Results</h1>
          {this.createCards()}
          {this.state.showm && <Example showm={this.state.showm} head={this.state.showT} url={this.state.showURL}/>}
          </div>
        );
   	}
   	else{
   		return<div><h1 style={{fontSize:"25px"}}>Results</h1></div>;
   	}


	
	}
}

export default Search;