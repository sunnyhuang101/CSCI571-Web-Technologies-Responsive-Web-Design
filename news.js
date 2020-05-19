import React, {useState, useEffect} from 'react';
import { Card, Badge, Button, Col, Row, Container} from 'react-bootstrap';
import {EmailShareButton, FacebookShareButton, TwitterShareButton,EmailIcon, FacebookIcon, TwitterIcon} from "react-share";
import { IoMdShare } from "react-icons/io";
import ToastHeader from 'react-bootstrap/ToastHeader';
import Toast from 'react-bootstrap/Toast';
import Modal from 'react-bootstrap/Modal';
import Spinner from 'react-bootstrap/Spinner';
import Overlay from 'react-bootstrap/Overlay';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import { MdExpandMore,MdExpandLess } from "react-icons/md";
import { FaRegBookmark, FaBookmark } from "react-icons/fa";
import commentBox from 'commentbox.io';
import PageWithComments from './test_commentbox.js';
import ExpandCard from './expandCard.js';
import {Redirect, Link} from 'react-router-dom';

//import AlertComp from './components/alertComp.js';
const cors = require('cors')
/*
<Card.Body >
       <div onClick={this.cardOnclick.bind(this, 0)}>
        
        <Card.Title className="card-title"  ><b>{titleList[0]}</b> <IoMdShare  onClick={this.toggleModal0} showm={this.state.showm0}></IoMdShare></Card.Title>
          <Card.Text className="card-text">{abstractList[0]}
          <span className="date" style={dateStyle}>{dateList[0]}</span>   
          <Badge style={tagStyle.tagColor1}>{sectionList[0]}</Badge>   
          </Card.Text>  
          </div>   
      <Example showm={this.state.showm0} head={titleList[0]} url={urlList[0]}/>      
        </Card.Body> 
        */

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


class News extends React.Component{

	constructor(props) {
    super(props);
    this.state = {
      titleList : [],
      dateList : [],
      imgList : [],
      abstractList : [],
      sectionList: [],
      urlList:[],
      article_idList:[],
      article_urlList:[],
      showm0:false,
      showm1:false,
      showm2:false,
      showm3:false,
      showm4:false,
      showm5:false,
      showm6:false,
      showm7:false,
      showm8:false,
      showm9:false,
      loading2 :false,
      detailed:false,
      currentCard: 0 ,
      content:"",
      expandIcon: false,
      expandLessList:[],
      expandMoreList:[],
      loading3 : false,
      expandflag:false,
      source:false
    };
  this.toggleModal0 = this.toggleModal0.bind(this);
  this.toggleModal1 = this.toggleModal1.bind(this);
  this.toggleModal2 = this.toggleModal2.bind(this);
  this.toggleModal3 = this.toggleModal3.bind(this);
  this.toggleModal4 = this.toggleModal4.bind(this);
  this.toggleModal5 = this.toggleModal5.bind(this);
  this.toggleModal6 = this.toggleModal6.bind(this);
  this.toggleModal7 = this.toggleModal7.bind(this);
  this.toggleModal8 = this.toggleModal8.bind(this);
   this.toggleModal9 = this.toggleModal9.bind(this);
   this.cardOnclick = this.cardOnclick.bind(this);
   
 

  }



 toggleModal0(showm0) {
    this.setState({ showm0:true });

} 
toggleModal1(showm1) {
    this.setState({ showm1:true });

}
toggleModal2(showm2) {
    this.setState({ showm2:true });

}
toggleModal3(showm3) {
    this.setState({ showm3:true });

}
toggleModal4(showm4) {
    this.setState({ showm4:true });

}
toggleModal5(showm5) {
    this.setState({ showm5:true });

}
toggleModal6(showm6) {
    this.setState({ showm6:true });

}
toggleModal7(showm7) {
    this.setState({ showm7:true });

}
toggleModal8(showm8) {
    this.setState({ showm8:true });

}
toggleModal9(showm9) {
    this.setState({ showm9:true });

}




  componentDidMount() {
    this.setState({loading2:true});

  
    
    var url = 'https://node-shiuanchhw8.wl.r.appspot.com/getNews/'+ this.props.tag;
    
    if (this.props.checked == true){
      url = 'https://node-shiuanchhw8.wl.r.appspot.com/getNews/guardian-'+this.props.tag;
      this.setState({source: true});
    }
  	//https://api.nytimes.com/svc/topstories/v2/home.json?api-key=BkAxYc4aqxEigKCvX1HXA6XCSbD9o0vz
    fetch(url) //'http://localhost:5000/getNews'  "./api/routes/getNews"
    //fetch("api/routes/getNews")
    .then((response) => {
    // 這裡會得到一個 ReadableStream 的物件
    // 可以透過 blob(), json(), text() 轉成可用的資訊
    
    return response.text();//.json(); 
  }).then((data_str) => {
    //console.log(jsonData.results[0].title);
    var data_arr = JSON.parse(data_str);
	var i;
	var titleList = [];
	var  dateList = [];
	var imgList = [];
	var abstractList = [];
	var sectionList = [];
  var urlList = [];
  var expandLessList = [];
  var expandMoreList = [];
  var article_idList = [];
  var article_urlList = [];
    for(i=0;i < data_arr.length;i++){
    	titleList.push(data_arr[i].title);
    	dateList.push(data_arr[i].date);
    	imgList.push(data_arr[i].imgs);
    	abstractList.push(data_arr[i].abstract);
    	sectionList.push(data_arr[i].section);
      urlList.push(data_arr[i].url);
      expandLessList.push(data_arr[i].expandLess);
      expandMoreList.push(data_arr[i].expandMore);
      article_idList.push(data_arr[i].article_id);
      article_urlList.push(data_arr[i].article_url);
    }
    
     
   this.setState({
   			titleList: titleList,
   			dateList: dateList,
            //items: "ho", //jsonData.results[0].title,
            imgList: imgList, //jsonData.results[0].multimedia[0].url,
           abstractList: abstractList,
           sectionList:sectionList,
           urlList:urlList,
           loading2:false,
           expandLessList:expandLessList,
           expandMoreList:expandMoreList,
           article_idList:article_idList,
           article_urlList:article_urlList
           
            //date: "ddd"//jsonData.results[0].published_date
          });
    
  }).catch((err) => {
    console.log('錯誤:', err);
  });
  
}    

cardOnclick(cardIdx){


  this.setState({
    detailed:true,
    currentCard:cardIdx,
    loading3:true,
    expandflag:true
  });



  

}


	render() {
		const { titleList, dateList, imgList, abstractList, sectionList,urlList, expandMoreList,expandLessList, article_idList, article_urlList } = this.state;
		
    	const imgStyle2 = {
        padding:"2px",
        borderStyle:"solid",
        borderRadius:"5px",
        borderWidth:"1px",
        borderColor:"#ececec"
      }

    	const dateStyle = {
    		fontStyle:"italic",
    		fontWeight: "450",
			float:"left"

    	};

    	const tagStyle = {
    		
  			tagColor1 : {
  			float:"right",
  			marginRight:"15px",
  			borderRadius:"5px",
  			fontSize:"15px",
    		backgroundColor: colorMap.get(sectionList[0]),
    		color: fontColorMap.get(sectionList[0])
    		},
    		tagColor2 : {
  			float:"right",
  			marginRight:"15px",
  			borderRadius:"5px",
  			fontSize:"15px",
    		backgroundColor: colorMap.get(sectionList[1]),
    		color: fontColorMap.get(sectionList[1])
    		},
    		tagColor3 : {
  			float:"right",
  			marginRight:"15px",
  			borderRadius:"5px",
  			fontSize:"15px",
    		backgroundColor: colorMap.get(sectionList[2]),
    		color: fontColorMap.get(sectionList[2])
    		},
    		tagColor4 : {
  			float:"right",
  			marginRight:"15px",
  			borderRadius:"5px",
  			fontSize:"15px",
    		backgroundColor: colorMap.get(sectionList[3]),
    		color: fontColorMap.get(sectionList[3])
    		},
    		tagColor5 : {
  			float:"right",
  			marginRight:"15px",
  			borderRadius:"5px",
  			fontSize:"15px",
    		backgroundColor: colorMap.get(sectionList[4]),
    		color: fontColorMap.get(sectionList[4])
    		},
    		tagColor6 : {
  			float:"right",
  			marginRight:"15px",
  			borderRadius:"5px",
  			fontSize:"15px",
    		backgroundColor: colorMap.get(sectionList[5]),
    		color: fontColorMap.get(sectionList[5])
    		},
    		tagColor7 : {
  			float:"right",
  			marginRight:"15px",
  			borderRadius:"5px",
  			fontSize:"15px",
    		backgroundColor: colorMap.get(sectionList[6]),
    		color: fontColorMap.get(sectionList[6])
    		},
    		tagColor8 : {
  			float:"right",
  			marginRight:"15px",
  			borderRadius:"5px",
  			fontSize:"15px",
    		backgroundColor: colorMap.get(sectionList[7]),
    		color: fontColorMap.get(sectionList[7])
    		},
    		tagColor9 : {
  			float:"right",
  			marginRight:"15px",
  			borderRadius:"5px",
  			fontSize:"15px",
    		backgroundColor: colorMap.get(sectionList[8]),
    		color: fontColorMap.get(sectionList[8])
    		},
    		tagColor10 : {
  			float:"right",
  			marginRight:"15px",
  			borderRadius:"5px",
  			fontSize:"15px",
    		backgroundColor: colorMap.get(sectionList[9]),
    		color: fontColorMap.get(sectionList[9])
    		}

    	};


    	
    	
    
      const spinnderStyle={
        marginTop:"300px",
        marginLeft:"600px",
        fontWeight:"450",
        backgroundColor:"blud"
      };

     

      const shareClickStyle= {
        float:"right",
        marginRight:"13px",
        cursor: "pointer"
      };

   

      if (this.state.expandflag){
        
         var currentCard = this.state.currentCard;
        return (
          <div>
           {this.state.loading2 && <div style={spinnderStyle}>  <span style={{background:"#67acfc", marginLeft:"10px", height:"22px", width:"22px", display: "inline-block",borderRadius: "100%"}}><Spinner animation="grow" variant="primary"/></span><br/><span>Loading</span></div>}
          {!this.state.loading2 &&
            <Redirect to={{pathname:'/articles?id='+article_idList[currentCard], state:{"article_id":article_idList[currentCard], "article_url": article_urlList[currentCard], "section": this.state.sectionList[currentCard], "url":this.state.urlList[currentCard], "checked":this.state.source, "img": this.state.imgList[currentCard]}}} />
          }
          </div>
        );
      }


  
    	return(
    	<div>

      {this.state.loading2 && <div style={spinnderStyle}>  <span style={{background:"#67acfc", marginLeft:"10px", height:"22px", width:"22px", display: "inline-block",borderRadius: "100%"}}><Spinner animation="grow" variant="primary"/></span><br/><span>Loading</span></div>}
      {!this.state.loading2 &&
      <div>
      
      
    	<Card  style={{ marginBottom:"10px", marginLeft:"10px",marginRight:"10px", boxShadow: "0 4px 8px 0 rgba(0,0,0,0.2)",cursor: "pointer"}}>
        <Card.Body >
          <Col sm={12} lg={3}>
            <img  variant="top" src={imgList[0]} style={imgStyle2} width="100%" onClick={this.cardOnclick.bind(this, 0)}/>
          </Col>
          <Col sm={12} lg={9}>
           <Card.Title style={{fontSize: "18px",fontStyle:"italic", display:"flex"}} ><b>{titleList[0]}<IoMdShare  onClick={this.toggleModal0} showm={this.state.showm0}></IoMdShare></b> </Card.Title>
             <div onClick={this.cardOnclick.bind(this, 0)}>
               <Card.Text >{abstractList[0]}
              </Card.Text>  
              <span className="date" style={dateStyle}>{dateList[0]}</span>   
                <Badge style={tagStyle.tagColor1}>{sectionList[0]}</Badge>   
            </div>   
            </Col>
        <Example showm={this.state.showm0} head={titleList[0]} url={urlList[0]}/>      
          
           
          </Card.Body>
        

        
		</Card>

		<Card style={{marginBottom:"10px", marginLeft:"10px",marginRight:"10px", boxShadow: "0 4px 8px 0 rgba(0,0,0,0.2)",cursor: "pointer"}}>
  			<Card.Body >
          <Col sm={12} lg={3}>
            <img  variant="top" src={imgList[1]} style={imgStyle2} width="100%" onClick={this.cardOnclick.bind(this, 1)} />
          </Col>
          <Col sm={12} lg={9}>
     				 <Card.Title style={{fontSize: "18px",fontStyle:"italic", display:"flex"}} ><b>{titleList[1]}<IoMdShare  onClick={this.toggleModal1} showm={this.state.showm1}></IoMdShare></b> </Card.Title>
      			<div onClick={this.cardOnclick.bind(this, 1)}>
            <Card.Text >{abstractList[1]}
            </Card.Text>
            <span className="date" style={dateStyle}>{dateList[1]}</span>
            <Badge style={tagStyle.tagColor2}>{sectionList[1]}</Badge>
            </div>
            </Col>
            <Example showm={this.state.showm1} head={titleList[1]} url={urlList[1]}/>
    		</Card.Body> 
		</Card>

		<Card  style={{marginBottom:"10px", marginLeft:"10px",marginRight:"10px", boxShadow: "0 4px 8px 0 rgba(0,0,0,0.2)",cursor: "pointer"}}>
  			<Card.Body >
        <Col sm={12} lg={3}>
            <img  variant="top" src={imgList[2]} style={imgStyle2} width="100%" onClick={this.cardOnclick.bind(this, 2)} />
          </Col>
          <Col sm={12} lg={9}>
  			
   				 <Card.Title style={{fontSize: "18px",fontStyle:"italic", display:"flex"}} ><b>{titleList[2]}<IoMdShare  onClick={this.toggleModal2} showm={this.state.showm2}></IoMdShare></b> </Card.Title>
    		<div onClick={this.cardOnclick.bind(this, 2)}>
          <Card.Text >{abstractList[2]}
    			</Card.Text>
    			<span className="date" style={dateStyle}>{dateList[2]}</span>
    			<Badge style={tagStyle.tagColor3}>{sectionList[2]}</Badge>
          </div>
          </Col>
           <Example showm={this.state.showm2} head={titleList[2]} url={urlList[2]}/>
    		</Card.Body> 
		</Card>

		<Card  style={{ marginBottom:"10px",marginLeft:"10px",marginRight:"10px", boxShadow: "0 4px 8px 0 rgba(0,0,0,0.2)",cursor: "pointer"}}>
  			<Card.Body >
         <Col sm={12} lg={3}>
            <img  variant="top" src={imgList[3]} style={imgStyle2} width="100%" onClick={this.cardOnclick.bind(this, 3)}/>
          </Col>
          <Col sm={12} lg={9}>
  			
   				 <Card.Title style={{fontSize: "18px",fontStyle:"italic", display:"flex"}} ><b>{titleList[3]}<IoMdShare  onClick={this.toggleModal3} showm={this.state.showm3}></IoMdShare></b> </Card.Title>
    		<div onClick={this.cardOnclick.bind(this, 3)}>
          <Card.Text >{abstractList[3]}
    			</Card.Text>
    			<span className="date" style={dateStyle}>{dateList[3]}</span>
    			<Badge style={tagStyle.tagColor4}>{sectionList[3]}</Badge>
          </div>
          </Col>
           <Example showm={this.state.showm3} head={titleList[3]} url={urlList[3]}/>
    		</Card.Body> 
		</Card>

		<Card style={{marginBottom:"10px", marginLeft:"10px",marginRight:"10px", boxShadow: "0 4px 8px 0 rgba(0,0,0,0.2)",cursor: "pointer"}}>
  			<Card.Body >
         <Col sm={12} lg={3}>
            <img  variant="top" src={imgList[4]} style={imgStyle2} width="100%" onClick={this.cardOnclick.bind(this, 4)}/>
          </Col>
          <Col sm={12} lg={9}>
  			
   			 <Card.Title style={{fontSize: "18px",fontStyle:"italic", display:"flex"}} ><b>{titleList[4]}<IoMdShare  onClick={this.toggleModal4} showm={this.state.showm4}></IoMdShare></b> </Card.Title>
       			<div onClick={this.cardOnclick.bind(this, 4)}>
          <Card.Text >{abstractList[4]}
    			</Card.Text>
    			<span className="date" style={dateStyle}>{dateList[4]}</span>
    			<Badge style={tagStyle.tagColor5}>{sectionList[4]}</Badge>
          </div>
          </Col>
           <Example showm={this.state.showm4} head={titleList[4]} url={urlList[4]}/>
    		</Card.Body> 
		</Card>

		<Card style={{marginBottom:"10px", marginLeft:"10px",marginRight:"10px", boxShadow: "0 4px 8px 0 rgba(0,0,0,0.2)",cursor: "pointer"}}>
  			<Card.Body >
        <Col sm={12} lg={3}>
            <img  variant="top" src={imgList[5]} style={imgStyle2} width="100%"  onClick={this.cardOnclick.bind(this, 5)}/>
          </Col>
          <Col sm={12} lg={9}>
  		   <Card.Title style={{fontSize: "18px",fontStyle:"italic", display:"flex"}} ><b>{titleList[5]}<IoMdShare  onClick={this.toggleModal5} showm={this.state.showm5}></IoMdShare></b> </Card.Title>
    
   					<div onClick={this.cardOnclick.bind(this, 5)}>
          <Card.Text >{abstractList[5]}
    			</Card.Text>
    			<span className="date" style={dateStyle}>{dateList[5]}</span>
    			<Badge style={tagStyle.tagColor6}>{sectionList[5]}</Badge>
          </div>
          </Col>
           <Example showm={this.state.showm5} head={titleList[5]} url={urlList[5]}/>
    		</Card.Body> 
		</Card>

		<Card style={{marginBottom:"10px", marginLeft:"10px",marginRight:"10px", boxShadow: "0 4px 8px 0 rgba(0,0,0,0.2)",cursor: "pointer"}}>
  			<Card.Body >
         <Col sm={12} lg={3}>
            <img  variant="top" src={imgList[6]} style={imgStyle2} width="100%" onClick={this.cardOnclick.bind(this, 6)}/>
          </Col>
          <Col sm={12} lg={9}>
  			 <Card.Title style={{fontSize: "18px",fontStyle:"italic", display:"flex"}} ><b>{titleList[6]}<IoMdShare  onClick={this.toggleModal6} showm={this.state.showm6}></IoMdShare></b> </Card.Title>
    
   				<div onClick={this.cardOnclick.bind(this, 6)}>
          <Card.Text >{abstractList[6]}
    			</Card.Text>
    			<span className="date" style={dateStyle}>{dateList[6]}</span>
    			<Badge style={tagStyle.tagColor7}>{sectionList[6]}</Badge>
          </div>
          </Col>
           <Example showm={this.state.showm6} head={titleList[6]} url={urlList[6]}/>

    		</Card.Body> 
		</Card>

		<Card style={{marginBottom:"10px", marginLeft:"10px",marginRight:"10px", boxShadow: "0 4px 8px 0 rgba(0,0,0,0.2)",cursor: "pointer"}}>
  			<Card.Body >
        <Col sm={12} lg={3}>
            <img  variant="top" src={imgList[7]} style={imgStyle2} width="100%" onClick={this.cardOnclick.bind(this, 7)}/>
          </Col>
          <Col sm={12} lg={9}>
  			 <Card.Title style={{fontSize: "18px",fontStyle:"italic", display:"flex"}} ><b>{titleList[7]}<IoMdShare  onClick={this.toggleModal7} showm={this.state.showm7}></IoMdShare></b> </Card.Title>
    
   				<div onClick={this.cardOnclick.bind(this, 7)}>
          <Card.Text >{abstractList[7]}
    			</Card.Text>
    			<span className="date" style={dateStyle}>{dateList[7]}</span>
    			<Badge style={tagStyle.tagColor8}>{sectionList[7]}</Badge>
          </div>
          </Col>
           <Example showm={this.state.showm7} head={titleList[7]} url={urlList[7]}/>
    		</Card.Body> 
		</Card>

		<Card style={{marginBottom:"10px", marginLeft:"10px",marginRight:"10px", boxShadow: "0 4px 8px 0 rgba(0,0,0,0.2)",cursor: "pointer"}}>
  			<Card.Body >
         <Col sm={12} lg={3}>
            <img  variant="top" src={imgList[8]} style={imgStyle2} width="100%" onClick={this.cardOnclick.bind(this, 8)} />
          </Col>
          <Col sm={12} lg={9}>
  		   <Card.Title style={{fontSize: "18px",fontStyle:"italic", display:"flex"}} ><b>{titleList[8]}<IoMdShare  onClick={this.toggleModal8} showm={this.state.showm8}></IoMdShare></b> </Card.Title>
    
   				<div onClick={this.cardOnclick.bind(this, 8)}>
          <Card.Text >{abstractList[8]}
    			</Card.Text>
    			<span className="date" style={dateStyle}>{dateList[8]}</span>
    			<Badge style={tagStyle.tagColor9}>{sectionList[8]}</Badge>
          </div>
          </Col>
           <Example showm={this.state.showm8} head={titleList[8]} url={urlList[8]}/>
    		</Card.Body> 
		</Card>

		<Card style={{marginBottom:"10px", marginLeft:"10px",marginRight:"10px", boxShadow: "0 4px 8px 0 rgba(0,0,0,0.2)",cursor: "pointer"}}>
  			<Card.Body >
         <Col sm={12} lg={3}>
            <img  variant="top" src={imgList[9]} style={imgStyle2} width="100%" onClick={this.cardOnclick.bind(this, 9)}/>
          </Col>
          <Col sm={12} lg={9}>
            <Card.Title style={{fontSize: "18px",fontStyle:"italic", display:"flex"}} ><b>{titleList[9]}<IoMdShare  onClick={this.toggleModal9} showm={this.state.showm9}></IoMdShare></b> </Card.Title>
    
   						<div onClick={this.cardOnclick.bind(this, 9)}>
          <Card.Text>{abstractList[9]}
    			</Card.Text>
    			<span className="date" style={dateStyle}>{dateList[9]}</span>
    			<Badge style={tagStyle.tagColor10}>{sectionList[9]}</Badge>
          </div>
          </Col>
           <Example showm={this.state.showm9} head={titleList[9]} url={urlList[9]}/>
    		</Card.Body> 
		</Card>
    
</div>
}  
		</div>

		);
  	}
}

export default News;