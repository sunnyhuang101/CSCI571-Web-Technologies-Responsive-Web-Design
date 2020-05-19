import React, {useState, useEffect} from 'react';
import { Card, Badge, Button,Container, Row, Col} from 'react-bootstrap';
import {EmailShareButton, FacebookShareButton, TwitterShareButton,EmailIcon, FacebookIcon, TwitterIcon} from "react-share";
import {Redirect, Link} from 'react-router-dom';
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





class Fav extends React.Component{
  
     constructor(props) {
      super(props);
      var storageBookmarkObj = localStorage.getItem('bookmarkObj');
      var retrieveb = [];
      var retrieve_each = [];
      if (storageBookmarkObj != null){
        retrieveb = storageBookmarkObj.split(',');
        var i;
        for(i = 0; i < retrieveb.length; i++){
          
          var eachBookmarkObj = localStorage.getItem(retrieveb[i]);
          retrieve_each.push(JSON.parse(eachBookmarkObj));

        }
      }
       
    var k;
    var titleList = [];
    var sourceList = [];
    var showList = [];
    console.log(retrieveb);
    for(k=0; k < retrieveb.length; k++){
      var source = "GUARDIAN";
      if (retrieve_each[k].checked == false){
        source = "NYTIMES";
      }


      var title = retrieve_each[k].title;
      if (retrieve_each[k].title.length > 60){
        var title = retrieve_each[k].title.substring(0,60);
        var check_i = title.length-1;

        while(title[check_i] != " "){
          check_i -= 1;
        }
        title = title.substring(0, check_i)+"...";
      }
      titleList.push(title);
      sourceList.push(source);
      showList.push(false);
     

    }



    this.state = { 
     bookmark: retrieveb,
     eachbookmark: retrieve_each,
     showm:false,
     showT:"",
     showURL:"",
      currentCard: 0 ,
      expandflag:false,
      titleList:titleList,
      sourceList:sourceList,
      showList:showList,
      showtoast:false,
      showtoastText:""

    };
   this.createCards = this.createCards.bind(this);
   this.toggleModal = this.toggleModal.bind(this);
   this.cardOnclick = this.cardOnclick.bind(this);
   this.deleteOnClick = this.deleteOnClick.bind(this);

  }

toggleModal(showm, showT, showURL) {
    this.setState({ 
      showm:showm,
      showT:showT,
      showURL:showURL
     });


} 

deleteOnClick(id){
   var storageBookmarkObj = localStorage.getItem('bookmarkObj');
   var s;
   var deleteTitle = JSON.parse(localStorage.getItem(id)).title;

    storageBookmarkObj = storageBookmarkObj.split(','); 
    for(s=0;s<storageBookmarkObj.length;s++){
      if (storageBookmarkObj[s] == id){
      storageBookmarkObj.splice(s, 1);
      //console.log(storageBookmarkObj);
      if (storageBookmarkObj.length > 0){
        localStorage.setItem('bookmarkObj', storageBookmarkObj.toString());
      }
      else{
        localStorage.removeItem('bookmarkObj');
      }

      localStorage.removeItem(id)
      break;
      }
    }



     storageBookmarkObj = localStorage.getItem('bookmarkObj');
      var retrieveb = [];
      var retrieve_each = [];
      if (storageBookmarkObj != null){
        retrieveb = storageBookmarkObj.split(',');
        var i;
        for(i = 0; i < retrieveb.length; i++){
          
          var eachBookmarkObj = localStorage.getItem(retrieveb[i]);
          retrieve_each.push(JSON.parse(eachBookmarkObj));

        }
      }
       
    var k;
    var titleList = [];
    var sourceList = [];
    var showList = [];
    //console.log(retrieveb);
    for(k=0; k < retrieveb.length; k++){
      var source = "GUARDIAN";
      if (retrieve_each[k].checked == false){
        source = "NYTIMES";
      }


      var title = retrieve_each[k].title;
      if (retrieve_each[k].title.length > 60){
        var title = retrieve_each[k].title.substring(0,60);
        var check_i = title.length-1;

        while(title[check_i] != " "){
          check_i -= 1;
        }
        title = title.substring(0, check_i)+"...";
      }
      titleList.push(title);
      sourceList.push(source);
      showList.push(false);
     

    }



    this.setState ({ 
     bookmark: retrieveb,
     eachbookmark: retrieve_each,
     showm:false,
     showT:"",
     showURL:"",
      currentCard: 0 ,
      expandflag:false,
      titleList:titleList,
      sourceList:sourceList,
      showList:showList,
      showtoast:true,
      showtoastText: deleteTitle

    });
   
}

cardOnclick(cardIdx){


  this.setState({
    currentCard:cardIdx,
    expandflag:true
  });



  

}


  createCards(){
   

      const imgBoxStyle = {
        
        height:"145px",
        width:"100%",
        marginLeft:"auto",
        marginRight:"auto"
      };

      const imgStyle = {
        width:"97.5%",
        height:"97%",
      margin:"2px",
      float:"center"
      };

      const cardTitleStyle = {
        display:"block",
        fontSize: "14px",
        fontStyle:"italic"
      };

      const dateStyle = {
        fontStyle:"italic",
        fontWeight: "450",
        fontSize:"12px",
      float:"left"

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
    
    for(i=0;i < this.state.bookmark.length; i++){
      //console.log(this.state.eachbookmark[i].section);
       
        
        cardsList.push(
          <Col lg={3}>
              
             <Card style={{ marginBottom:"10px", marginLeft:"5px",marginRight:"5px", boxShadow: "0 4px 8px 0 rgba(0,0,0,0.2)",cursor: "pointer" , height:"34rem"}}  >
             <Card.Body>
               <Card.Title  style={cardTitleStyle}><b>{this.state.titleList[i]}</b><IoMdShare  onClick={this.toggleModal.bind(this, true,this.state.eachbookmark[i].title, this.state.eachbookmark[i].url )}></IoMdShare><FaTrash onClick={this.deleteOnClick.bind(this, this.state.bookmark[i])}/></Card.Title>
                <div onClick={this.cardOnclick.bind(this, i)}>
                
                <img src={this.state.eachbookmark[i].img} style={imgStyle2} width="100%"/>
                
                <span className="date" style={dateStyle}>{this.state.eachbookmark[i].date}</span> 
                 <Badge style={{float:"right",marginRight:"5px",borderRadius:"5px",fontSize:"10px",backgroundColor: colorMap.get(this.state.sourceList[i]),color: fontColorMap.get(this.state.sourceList[i])}}>{this.state.sourceList[i]}</Badge>  
                <Badge style={{float:"right",marginRight:"5px",borderRadius:"5px",fontSize:"10px",backgroundColor: colorMap.get(this.state.eachbookmark[i].section),color: fontColorMap.get(this.state.eachbookmark[i].section)}}>{this.state.eachbookmark[i].section}</Badge>  
                </div>
                </Card.Body>   

            </Card>
            
        </Col>
        );
        
      
    }
    var List = [];
    List.push(<div>{cardsList}</div>);
    return List;
  }

    

   render(){
    
      var currentCard = this.state.currentCard
      if (this.state.expandflag){
        return  <Redirect to={{pathname:'/articles?id='+this.state.bookmark[currentCard+1], state:{"article_id": this.state.bookmark[currentCard], "article_url": this.state.eachbookmark[currentCard].article_url, "section": this.state.eachbookmark[currentCard].section, "url":this.state.eachbookmark[currentCard].url, "checked":this.state.eachbookmark[currentCard].checked, "img": this.state.eachbookmark[currentCard].img}}} />;

      }
   		else if (this.state.bookmark == [] || this.state.bookmark.length == 0){
   			return<div ><h1 style={{fontSize:"20px",fontWeight:"550",  width:"300px",marginLeft:"auto", marginRight:"auto"}}> You have no saved articles</h1>
        {this.state.showtoast &&
          
              <Toast animation={true} onClose={() => this.setState({showtoast:false})} show={this.state.showtoast} delay={3000} autohide style={{position:"absolute", zIndex:1, top:"20px", left:"0",right:"0", marginLeft:"auto", marginRight:"auto"}}>
                <Toast.Header >
                  <span style={{ color:"black", fontSize:"13px", fontWeight:"450"}}>Removing {this.state.showtoastText}</span>         
                </Toast.Header>
              </Toast>
            
        }</div>;
   		}
   		else{
   			return(
          <div>
          
          <h1 style={{fontSize:"25px", marginLeft: "13px"}}>Favorites</h1>
            {this.state.showtoast &&
              <Toast animation={true} onClose={() => this.setState({showtoast:false})} show={this.state.showtoast} delay={3000} autohide style={{marginLeft:"auto", marginRight:"auto", position:"absolute", zIndex:1, top:"20px", left:"0", right:"0"}}>
          
          <Toast.Header >
            <span style={{ color:"black", fontSize:"13px", fontWeight:"450"}}>Removing {this.state.showtoastText}</span>         
          </Toast.Header>
        </Toast>
        }
          
          {this.createCards()}
         
          {this.state.showm && <Example showm={this.state.showm} head={this.state.showT} url={this.state.showURL}/>}
          </div>
        );
   		}
   }
}

 

export default Fav;