const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');
const cors = require('cors')

router.get('/:search', (req, res, next) => {

const urlny =  "https://api.nytimes.com/svc/search/v2/articlesearch.json?q=" + req.params.search +"&api-key=BkAxYc4aqxEigKCvX1HXA6XCSbD9o0vz";

const urlgd = "https://content.guardianapis.com/search?q=" + req.params.search + "&api-key=a0eeb4bf-da3a-4020-b5a6-4949c35c7b02&show-blocks=all";

	Promise.all([
  		fetch(urlny),
  		fetch(urlgd)
  	]).then(([res1, res2]) => Promise.all([res1.json(), res2.json()]))
      .then(([data1, data2]) => {


 		data_list = [];
 		var count = 0;
     	var i = 0;
    	while(count < 10 ){
    	
	    	
	    	
	    	while(count < 5){
	    		var title;
	    		var imgs;
	    		var date;
    			var section;
    			var source = "GUARDIAN";
    			var url;

    			if(data2.response.results != undefined && data2.response.results[i].webTitle != undefined && data2.response.results[i].blocks && data2.response.results[i].blocks.main && data2.response.results[i].blocks.main.elements != undefined && data2.response.results[i].blocks.main.elements[0].assets != undefined && data2.response.results[i].blocks.main.elements[0].assets[data2.response.results[i].blocks.main.elements[0].assets.length-1] != undefined){
    				
    				title = data2.response.results[i].webTitle;
    				var last = data2.response.results[i].blocks.main.elements[0].assets.length-1;
           			imgs = data2.response.results[i].blocks.main.elements[0].assets[last].file;
         			date = data2.response.results[i].webPublicationDate;
         			section = data2.response.results[i].sectionId.toUpperCase();
         			url = data2.response.results[i].webUrl;
         			if ( title.length > 0  && title != null && date.length > 0 && date != null && section.length > 0 && section != null){
          			  var j = 0;
			          
			          var img_pic = "https://assets.guim.co.uk/images/eada8aa27c12fe2d5afa3a89d3fbae0d/fallback-logo.png";
			          
			          if (imgs != null)
			          	img_pic = imgs;

			          var article_id = data2.response.results[i].id.split("/").join("%2F");
         			  var article_url = 'https://content.guardianapis.com/'+data2.response.results[i].id+'?api-key=a0eeb4bf-da3a-4020-b5a6-4949c35c7b02&show-blocks=all';
       

			          data_list.push({
    					'title':title,
    					'date':date.substring(0,10),
    					'imgs':img_pic,
    					'section':section,
			              'url':url,
			              'source':source,
			              'article_id': article_id,
              				'article_url':article_url
	    				});

			          count += 1;
			          

          			}
    			}
    			i+=1;
	    	}
        i = 0;
      var count2 = 0;
	    	while(count2 < 5){
          var title;
          var imgs;
          var date;
          var section;
          var source = "NYTIMES";
          var url;


          
          if (data1.response.docs[i] != undefined &&data1.response.docs[i].headline != undefined && data1.response.docs[i].headline.main != undefined && data1.response.docs[i].news_desk != undefined && data1.response.docs[i].pub_date != undefined && data1.response.docs[i].web_url != undefined){
            title = data1.response.docs[i].headline.main;
            imgs = data1.response.docs[i].multimedia.url;
            date = data1.response.docs[i].pub_date;
            section = data1.response.docs[i].news_desk.toUpperCase();
            url = data1.response.docs[i].web_url;
            
            if (title.length > 0  && title != null  && date.length > 0 && date != null){
              var j = 0;
            
                 var img_pic = "http://csci571.com/hw/hw8/images/nytimes.jpg";

                 if (imgs != null){
                  while(j < imgs.length){
                    if (imgs[j].width >= 2000){
                          img_pic =  "https://www.nytimes.com/"+imgs[j].url;
                      break;
                    }
                    j+=1;
                  }
              }
              var article_url = 'https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=BkAxYc4aqxEigKCvX1HXA6XCSbD9o0vz&fq=web_url:("' + url +'")';
      
              data_list.push({
              'title':title,
              'date':date.substring(0,10),
              'imgs':img_pic,
              'section':section,
                    'url':url,
                    'source':source,
                    'article_id': url.split("/").join("%2F"),
                      'article_url':article_url
              });
            count += 1;
            count2 += 1;

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