const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');
const cors = require('cors');

router.get('/:article', (req, res, next) => {
var newsType = 0;
if (req.params.article.substring(0,2) == "gd"){
	newsType = 1;
}
const url = req.params.article.substring(2, req.params.article.length).split("%2F").join("/").split("%3F").join("?");

fetch(url)
  .then((response) => {
   
    return response.json(); 
  }).then((jsonData) => {
  	data_list = [];
  	
    
    if (newsType == 0){
     
		var title = jsonData.response.docs[0].headline.main;
		var abstract = jsonData.response.docs[0].abstract;
		var date = jsonData.response.docs[0].pub_date;
		var section = jsonData.response.docs[0].section_name.toUpperCase();
        var expandLess;
        var expandMore;
        var url = jsonData.response.docs[0].web_url;

       
       data_list.push({
    	'title':title,
    	'date':date.substring(0,10),
    	'section':section,
         'expandMore':"",
         'expandLess':abstract,
         'url':url
          });
    			
    		
    }
    else{
     
        var title = jsonData.response.content.webTitle;
        var date = jsonData.response.content.webPublicationDate;
        var section = jsonData.response.content.sectionName.toUpperCase();
        var expandLess;
        var expandMore = jsonData.response.content.blocks.body[0].bodyTextSummary;
        var url = jsonData.response.content.webUrl;

          if (jsonData.response.content.blocks.body[0].bodyTextSummary.length >= 1200){
            expandLess = jsonData.response.content.blocks.body[0].bodyTextSummary.substring(0, 1200);
          }
          else{
            expandLess = jsonData.response.content.blocks.body[0].bodyTextSummary;
          }

          var expandCheck = expandLess[expandLess.length - 1];
          var check_i = expandLess.length-1;
              while(expandCheck != "."){
                check_i -= 1;
                expandCheck = expandLess[check_i];
              }
            expandLess = expandLess.substring(0, check_i+1);
            expandMore = expandMore.substring(check_i+1, jsonData.response.content.blocks.body[0].bodyTextSummary.length);
          

          data_list.push({
              'title':title,
              'date':date.substring(0,10),
              'section':section,
              'expandLess':expandLess,
              'expandMore':expandMore,
              'url':url
              
            });
    
    }
  
    res.send(data_list);
  }).catch((err) => {
    console.log('錯誤:', err);
});
});
module.exports = router;