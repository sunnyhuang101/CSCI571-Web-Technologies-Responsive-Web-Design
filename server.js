const http = require('http');
//const app2 = require('./app2');
const fetch = require('node-fetch');
const cors = require('cors')

const express = require('express');
const app2 = express();

const productsRoute = require('./api/routes/products');
const newsRoute = require('./api/routes/getNews');
const ArticleRoute = require('./api/routes/getArticle');
const ResultsRoute = require('./api/routes/getResults');

//app.get('/', function (req, res) {
/*
fetch('https://api.nytimes.com/svc/topstories/v2/home.json?api-key=BkAxYc4aqxEigKCvX1HXA6XCSbD9o0vz')
        .then(
            function (response) {
                if (response.status !== 200) {
                    console.log('Looks like there was a problemStatus Code: ' +  response.status);
                    
                }
                // Examine the text in the response
                response.json().then(function (data) {
                    console.log(data.results[0].section);
                    res.send(data.status);
                    
                });
            }
        )
        .catch(function (err) {
            console.log('Fetch Error :-S', err);
            
        });
 */
//res.send("hello");
/*
 fetch('https://api.nytimes.com/svc/topstories/v2/home.json?api-key=BkAxYc4aqxEigKCvX1HXA6XCSbD9o0vz')
  .then((response) => {
    // 這裡會得到一個 ReadableStream 的物件
    console.log(response);
    // 可以透過 blob(), json(), text() 轉成可用的資訊
    return response.json(); 
  }).then((jsonData) => {
    res.send(jsonData.results[0].section);
  }).catch((err) => {
    console.log('錯誤:', err);
});
  	
});
*/
//apptry.listen(5000);
app2.use(cors());
app2.use('/products', productsRoute);
app2.use('/getNews', newsRoute);
app2.use('/getArticle', ArticleRoute);
app2.use('/getResults', ResultsRoute);

const port = process.env.PORT|| 5000;

const server = http.createServer(app2);

server.listen(port);
