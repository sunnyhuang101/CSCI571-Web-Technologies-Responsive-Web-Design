const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');
const cors = require('cors')

const sections = ["world", "politics", "business", "technology", "sports", "health", "guardian", "nytimes"];

router.get('/:tag', (req, res, next) => {
const tag = req.params.tag;
newsType = 0;

url = 'https://api.nytimes.com/svc/topstories/v2/home.json?api-key=BkAxYc4aqxEigKCvX1HXA6XCSbD9o0vz';

if (tag == "world"){
	url = "https://api.nytimes.com/svc/topstories/v2/world.json?api-key=BkAxYc4aqxEigKCvX1HXA6XCSbD9o0vz";
}

if (tag == "politics"){
	url = "https://api.nytimes.com/svc/topstories/v2/politics.json?api-key=BkAxYc4aqxEigKCvX1HXA6XCSbD9o0vz";
}

if (tag == "business"){
  
	url = "https://api.nytimes.com/svc/topstories/v2/business.json?api-key=BkAxYc4aqxEigKCvX1HXA6XCSbD9o0vz";
}		

if (tag == "technology"){
	url = "https://api.nytimes.com/svc/topstories/v2/technology.json?api-key=BkAxYc4aqxEigKCvX1HXA6XCSbD9o0vz";
}

if (tag == "sports"){
	url = "https://api.nytimes.com/svc/topstories/v2/sports.json?api-key=BkAxYc4aqxEigKCvX1HXA6XCSbD9o0vz";
}

if (tag == "guardian-home"){
  newsType = 1;
  url = 'https://content.guardianapis.com/search?api-key=a0eeb4bf-da3a-4020-b5a6-4949c35c7b02&section=(sport|business|technology|politics)&show-blocks=all';
}

if (tag == "guardian-world"){
  newsType = 1;
  url = 'https://content.guardianapis.com/world?api-key=a0eeb4bf-da3a-4020-b5a6-4949c35c7b02&show-blocks=all';
}

if (tag == "guardian-politics"){
  newsType = 1;
  url = 'https://content.guardianapis.com/politics?api-key=a0eeb4bf-da3a-4020-b5a6-4949c35c7b02&show-blocks=all';
}

if (tag == "guardian-business"){
  newsType = 1;
  url = 'https://content.guardianapis.com/business?api-key=a0eeb4bf-da3a-4020-b5a6-4949c35c7b02&show-blocks=all';
}

if (tag == "guardian-technology"){
  newsType = 1;
  url = 'https://content.guardianapis.com/technology?api-key=a0eeb4bf-da3a-4020-b5a6-4949c35c7b02&show-blocks=all';
}

if (tag == "guardian-sports"){
  newsType = 1;
  url = 'https://content.guardianapis.com/sport?api-key=a0eeb4bf-da3a-4020-b5a6-4949c35c7b02&show-blocks=all';

}

fetch(url)
  .then((response) => {
    // 這裡會得到一個 ReadableStream 的物件
    //console.log(response);
    // 可以透過 blob(), json(), text() 轉成可用的資訊
    return response.json(); 
  }).then((jsonData) => {
  	data_list = [];
  	
    
    if (newsType == 0){

      var count = 0;
      var i = 0;
    	while(count < 10 ){
    		var title ;
        var imgs;
        var abstract ;
        var date ;
        var section ;
        var subsection ;
        var url ; //.split("/").join("%2F")
        var expandLess;
        var expandMore;
        var article_url;

        if (jsonData.results != undefined && jsonData.results[i].title != undefined && jsonData.results[i].abstract!= undefined &&  jsonData.results[i].published_date != undefined){

         title = jsonData.results[i].title;
         imgs = jsonData.results[i].multimedia;
         abstract = jsonData.results[i].abstract;
         date = jsonData.results[i].published_date;
         section = jsonData.results[i].section;
         subsection = jsonData.results[i].subsection;
         url = jsonData.results[i].url; //.split("/").join("%2F")
      	 article_url = 'https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=BkAxYc4aqxEigKCvX1HXA6XCSbD9o0vz&fq=web_url:("' + url +'")';
      

    		if (title.length > 0  && title != null && abstract.length > 0 && abstract != null && date.length > 0 && date != null && ((section.length > 0 && section != null)|| (subsection.length > 0 && subsection != null) )){
    			var j = 0;
    			var found = false;
          var img_pic = "http://csci571.com/hw/hw8/images/nytimes.jpg";
    			
    			var sec = section;

          if (imgs != null){
      			while(j < imgs.length){
      				if (imgs[j].width >= 2000){
      					found = true;
                img_pic = imgs[j].url;
      					break;
      				}
      				j+=1;
      			}
    			}
    			

    			if (sections.includes(section)==false && (subsection.length > 0 && subsection != null)){
    				sec = subsection;
    				
    			}

    			if (tag != "home"){
    				sec = tag;
    			}
    			
    			
        
    			data_list.push({
    					'title':title,
    					'abstract':abstract,
    					'date':date.substring(0,10),
    					'imgs':img_pic,
    					'section':sec.toUpperCase(),
              'url':url,
              'expandMore':"",
              'expandLess':abstract,
              'article_id': url.split("/").join("%2F"),
              'article_url':article_url
    				});
    			count += 1;
    		}
      }
    		i+=1;
    		
    	}
    	

    }
    else{

      var count = 0;
      var i = 0;
     
       //&& i < jsonData.response.results.length
      while(count < 10 ){
        
        var title;
        var imgs;
        var abstract ;
        var date ;
        var section ;
        var url ;
        var expandLess;
        var expandMore ;
        var article_id;
        var article_url;
        
        if (i >= jsonData.response.results.length){
        	break;
        }

        if (jsonData.response != undefined && jsonData.response.results != undefined  && jsonData.response.results[i].webTitle != undefined && jsonData.response.results[i].blocks!= undefined && jsonData.response.results[i].blocks.main != undefined && jsonData.response.results[i].blocks.main.elements != undefined){
          
          title = jsonData.response.results[i].webTitle;
           imgs = jsonData.response.results[i].blocks.main.elements[0].assets;
         abstract = jsonData.response.results[i].blocks.body[0].bodyTextSummary;
         date = jsonData.response.results[i].webPublicationDate;
         section = jsonData.response.results[i].sectionId;
         url = jsonData.response.results[i].webUrl;
         expandLess;
         expandMore = jsonData.response.results[i].blocks.body[0].bodyTextSummary;
         article_id = jsonData.response.results[i].id.split("/").join("%2F");
         article_url = 'https://content.guardianapis.com/'+jsonData.response.results[i].id+'?api-key=a0eeb4bf-da3a-4020-b5a6-4949c35c7b02&show-blocks=all';
        if ( title.length > 0  && title != null && abstract.length > 0 && abstract != null && date.length > 0 && date != null && section.length > 0 && section != null){
          
          var j = 0;
          var found = false;
          var sec = section;
          var img_pic = "https://assets.guim.co.uk/images/eada8aa27c12fe2d5afa3a89d3fbae0d/fallback-logo.png";//imgs[j].file;
          
          if (imgs.length != 0){
            img_pic = imgs[j].file;

            while(j < imgs.length){
              if (imgs[j].typeData.width >= 2000){
                img_pic = imgs[j].file;
                found = true;
                break;
              }
              j+=1;
            }
          }
          else{
            found = false;
          }

          if (tag != "guardian-home"){
            sec = tag.substring(9,);
          }
          
          if (abstract.length >= 420 ){
            var checking = abstract[419];

            if (checking == " "){
              abstract = abstract.substring(0,419) + "...";
              
            }
            else{
              var check_i = 419;
              while(checking != " "){
                check_i -= 1;
                checking = abstract[check_i];
              }
              abstract = abstract.substring(0,check_i) + "...";

            }
          }

          if (jsonData.response.results[i].blocks.body[0].bodyTextSummary.length >= 1200){
            expandLess = jsonData.response.results[i].blocks.body[0].bodyTextSummary.substring(0, 1200);
          }
          else{
            expandLess = jsonData.response.results[i].blocks.body[0].bodyTextSummary;
          }

          var expandCheck = expandLess[expandLess.length - 1];
          var check_i = expandLess.length-1;
              while(expandCheck != "."){
                check_i -= 1;
                expandCheck = expandLess[check_i];
              }
            expandLess = expandLess.substring(0, check_i+1);
            expandMore = expandMore.substring(check_i+1, jsonData.response.results[i].blocks.body[0].bodyTextSummary.length);
          

          data_list.push({
              'title':title,
              'abstract':abstract,
              'date':date.substring(0,10),
              'imgs':img_pic,
              'section':sec.toUpperCase(),
              'url':url,
              'expandLess':expandLess,
              'expandMore':expandMore,
              'article_id': article_id,
              'article_url':article_url
            });
          count += 1;
        }
      }
        i+=1;
        
      }
    
    }
    
   
    res.send(data_list);
  }).catch((err) => {
    console.log('錯誤:', err);
});
});
module.exports = router;