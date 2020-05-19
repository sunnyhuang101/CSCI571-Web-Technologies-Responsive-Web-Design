import React, {useState} from 'react';
import { Container, Row, Col,Card, Badge, Button} from 'react-bootstrap';
import {EmailShareButton, FacebookShareButton, TwitterShareButton,EmailIcon, FacebookIcon, TwitterIcon} from "react-share";
import ToastHeader from 'react-bootstrap/ToastHeader';
import Toast from 'react-bootstrap/Toast';
import Spinner from 'react-bootstrap/Spinner';
import Overlay from 'react-bootstrap/Overlay';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import { MdExpandMore,MdExpandLess } from "react-icons/md";
import { FaRegBookmark, FaBookmark } from "react-icons/fa";
import commentBox from 'commentbox.io';
import PageWithComments from './test_commentbox.js';
import {Redirect, Link} from 'react-router-dom';

const cors = require('cors');

// console.log(this.props.location.state.article_url);
class ExpandCard extends React.Component{
    

     constructor(props) {
      super(props);
      var storageBookmarkObj = localStorage.getItem('bookmarkObj');
      //localStorage.setItem('bookmarkObj', storageBookmarkObj.toString());
      //console.log(localStorage.getItem('bookmarkObj'));
      var retrieveBookmarkIcon = false;
      if (storageBookmarkObj != null &&  storageBookmarkObj.split(',').includes(this.props.location.state.article_id) == true){
      retrieveBookmarkIcon = true
    }
    

      
    this.state = {
      title : "",
      date : "",
      img : this.props.location.state.img,
      section: this.props.location.state.section,
      url:this.props.location.state.url,
      expandIcon: false,
      expandLess:"",
      expandMore:"",
      article_url: this.props.location.state.article_url,
      checked: this.props.location.state.checked,
      bookmarkCardIconClicked:retrieveBookmarkIcon,
      loading :false,
      article_id:this.props.location.state.article_id,
       showtoast:false,
      showtoastText:""
      }
      
    

      this.handleBookmarkCardClicked =  this.handleBookmarkCardClicked.bind(this);
}

handleBookmarkCardClicked(){
    var storageBookmarkObj = localStorage.getItem('bookmarkObj') || [];
   

    if (this.state.bookmarkCardIconClicked == true){
        var deleteTitle = "Removing " + this.state.title;
      this.setState ({
        bookmarkCardIconClicked: false,
        showtoast:true,
      showtoastText: deleteTitle
      }); 
      var s;
      storageBookmarkObj = storageBookmarkObj.split(','); 
      for(s=0;s<storageBookmarkObj.length;s++){
        if (storageBookmarkObj[s] == this.state.article_id){
        storageBookmarkObj.splice(s, 1);
         if (storageBookmarkObj.length > 0){
          localStorage.setItem('bookmarkObj', storageBookmarkObj.toString());
        }
         else{
            localStorage.removeItem('bookmarkObj');
         }
        localStorage.removeItem(this.state.article_id)
        break;
        }
      }
    }
    else{
        var deleteTitle = "Saving " + this.state.title;
      this.setState ({
        bookmarkCardIconClicked: true,
         showtoast:true,
      showtoastText: deleteTitle
        
      });
      
        if (storageBookmarkObj != null && storageBookmarkObj.length > 0){
           storageBookmarkObj = storageBookmarkObj.split(',');
        }

        //storageBookmarkObj = storageBookmarkObj?storageBookmarkObj.split(',') : [];

        storageBookmarkObj.push(this.state.article_id);
        localStorage.setItem('bookmarkObj', storageBookmarkObj.toString());
      
        //var each = [this.state.img, this.state.checked, this.state.section, this.state.title, this.state.date, this.state.url];
        var each = JSON.stringify({
            "title":this.state.title,
            "img":this.state.img,
            "checked": this.state.checked,
            "section":this.state.section,
            "date":this.state.date,
            "url":this.state.url,
            "article_url":this.state.article_url

          });
        
        localStorage.setItem(this.state.article_id, each);
      //storageCardObj = storageCardObj?storageCardObj.split(',') : []; 
    }

    
 }





   componentDidMount() {
     
    this.setState({loading:true});
    
    var url = 'https://node-shiuanchhw8.wl.r.appspot.com/getArticle/'+ 'ny' + this.state.article_url.split("/").join("%2F").split("?").join("%3F");
    if (this.state.checked == true){
      url = 'https://node-shiuanchhw8.wl.r.appspot.com/getArticle'+ 'gd' + this.state.article_url.split("/").join("%2F").split("?").join("%3F");
    }
    //http://localhost:5000/getArticle/

    fetch(url)
    .then((response) => {
   
    return response.text();//.json(); 
    }).then((data_str) => {

       var data = JSON.parse(data_str)[0];

       this.setState({
        title: data.title,
        date: data.date,
        expandLess:data.expandLess,
        expandMore:data.expandMore,
        url:data.url,
        loading:false
          });
    
  }).catch((err) => {
    console.log('錯誤:', err);
  });
  
}    
     
   render(){
     const { title, date, img ,section,expandMore,expandLess} = this.state;
      var tagArr = ['CSCI_571_NewsApp'];
     

       const cardClickTitleStyle = {
        fontSize: "20px",
        fontStyle:"italic",
        fontWeight: "600",
        marginLeft: "10px"
      }

      const dateClickStyle = {
        fontStyle:"italic",
        fontWeight: "450",
      fleoat:"left",
      marginLeft:"15px"

      };

      const shareClickStyle= {
        float:"right",
        marginRight:"13px",
        cursor: "pointer"
      };

      const imgCardStyle = {
        width:"100%",
        
      margin:"2px"
      };

    
       const imgCardExpandStyle = {
        width:"100%",
        
      margin:"2px"
      };
    
       const spinnderStyle={
        marginTop:"300px",
        marginLeft:"600px",
        fontWeight:"450",
        backgroundColor:"blud"
      };


   	return(
      <div> 
         
        
           {this.state.loading && <div style={spinnderStyle}>  <span style={{background:"#67acfc", marginLeft:"10px", height:"22px", width:"22px", display: "inline-block",borderRadius: "100%"}}><Spinner animation="grow" variant="primary"/></span><br/><span>Loading</span></div>}
             {this.state.showtoast &&
              <Toast animation={true} onClose={() => this.setState({showtoast:false})} show={this.state.showtoast} delay={3000} autohide style={{marginLeft:"auto", marginRight:"auto", position:"absolute", zIndex:1, top:"20px", left:"0", right:"0"}}>
          
          <Toast.Header >
            <span style={{ color:"black", fontSize:"13px", fontWeight:"450"}}>{this.state.showtoastText}</span>         
          </Toast.Header>
        </Toast>
            }
          {!this.state.loading && !this.state.expandIcon &&
          <div>
          
            <Card style={{  marginLeft:"10px",marginRight:"10px", boxShadow: "0 4px 8px 0 rgba(0,0,0,0.2)"}}>
              <Card.Body >
                 <h1 style={cardClickTitleStyle} >{this.state.title}</h1>
                    <span className="date" style={dateClickStyle}>{this.state.date}</span>   
                  <span style={shareClickStyle}>
                  <OverlayTrigger overlay={<Tooltip id="tooltip-disabled">Facebook</Tooltip>}>
                      <FacebookShareButton url={this.state.url} hashtag="#CSCI_571_NewsApp" >
                        <FacebookIcon size={30} round />
                      </FacebookShareButton>
                    </OverlayTrigger>
                    <OverlayTrigger overlay={<Tooltip id="tooltip-disabled">Twitter</Tooltip>}>
                      <TwitterShareButton  url={this.state.url} hashtags={tagArr} >
                        <TwitterIcon size={30} round />
                      </TwitterShareButton>
                    </OverlayTrigger>
                    <OverlayTrigger overlay={<Tooltip id="tooltip-disabled">Email</Tooltip>}>
                      <EmailShareButton url={this.state.url} subject='#CSCI_571_NewsApp' body="">
                        <EmailIcon size={30} round />
                      </EmailShareButton>
                    </OverlayTrigger>
                    <span style={{visibility:"hidden"}}>&nbsp;&nbsp;&nbsp</span>

                    {!this.state.bookmarkCardIconClicked &&
                    <OverlayTrigger overlay={<Tooltip id="tooltip-disabled">Bookmark</Tooltip>}>
                    <FaRegBookmark size={22} style={{color:"red"}} onClick={this.handleBookmarkCardClicked}/>
                    </OverlayTrigger>
                    }
                    {this.state.bookmarkCardIconClicked &&
                    <OverlayTrigger  overlay={<Tooltip id="tooltip-disabled">Bookmark</Tooltip>}>
                    <FaBookmark size={22} style={{color:"red"}} onClick={this.handleBookmarkCardClicked}/>
                    </OverlayTrigger>
                    }
                </span>
            
                <img src={this.state.img} width="100%"/>
                <Card.Text className="card-text">{this.state.expandLess}
                </Card.Text>
                <br/><br/>
                <span style={{float:"right"}}> <MdExpandMore size={30} onClick={()=> {window.scrollTo({bottom: 0, behavior: 'smooth' }); this.setState({expandIcon:true});}}/></span>
 
              </Card.Body>
            </Card>
            
          </div>}
          {!this.state.loading && this.state.expandIcon &&
          <div>
          <Card style={{  marginLeft:"10px",marginRight:"10px", boxShadow: "0 4px 8px 0 rgba(0,0,0,0.2)"}}>
              
              <Card.Body >
              <h1 style={cardClickTitleStyle} >{this.state.title}</h1>
              <span className="date" style={dateClickStyle}>{this.state.date}</span>   
              <span style={shareClickStyle}>
              <OverlayTrigger overlay={<Tooltip id="tooltip-disabled">Facebook</Tooltip>}>
                  <FacebookShareButton url={this.stateurl} hashtag="#CSCI_571_NewsApp" >
                    <FacebookIcon size={30} round />
                  </FacebookShareButton>
                </OverlayTrigger>
                <OverlayTrigger overlay={<Tooltip id="tooltip-disabled">Twitter</Tooltip>}>
                  <TwitterShareButton  url={this.state.url} hashtags={tagArr} >
                    <TwitterIcon size={30} round />
                  </TwitterShareButton>
                </OverlayTrigger>
                <OverlayTrigger overlay={<Tooltip id="tooltip-disabled">Email</Tooltip>}>
                  <EmailShareButton url={this.state.url} subject='#CSCI_571_NewsApp' body="">
                    <EmailIcon size={30} round />
                  </EmailShareButton>
                </OverlayTrigger>
                 <span style={{visibility:"hidden"}}>&nbsp;&nbsp;&nbsp</span>

                    {!this.state.bookmarkCardIconClicked &&
                    <OverlayTrigger overlay={<Tooltip id="tooltip-disabled">Bookmark</Tooltip>}>
                    <FaRegBookmark size={22} style={{color:"red"}} onClick={this.handleBookmarkCardClicked}/>
                    </OverlayTrigger>
                    }
                    {this.state.bookmarkCardIconClicked &&
                    <OverlayTrigger overlay={<Tooltip id="tooltip-disabled">Bookmark</Tooltip>}>
                    <FaBookmark size={22} style={{color:"red"}} onClick={this.handleBookmarkCardClicked}/>
                    </OverlayTrigger>
                    }

              </span>
              <img  src={this.state.img} width="100%"/>
                <Card.Text >{this.state.expandLess}<br/><br/>{expandMore}
                </Card.Text>
                <br/><br/>
                <span style={{float:"right"}}> <MdExpandLess size={30} onClick={()=> {window.scrollTo({top:0,  behavior: 'smooth' }); this.setState({expandIcon:false});}}/></span>
         </Card.Body>
            </Card>
        </div>
      }
        <PageWithComments id={this.state.url}/>
      </div>
    
    );
   }
}

export default ExpandCard;