var watson = require('watson-developer-cloud'); 
var initialContent = require('./initialContent');
var auth = require('./auth');
var http = require('http');
var fs = require('fs');
var connect = require('connect');
var express = require('express');

// var personality_insights = watson.personality_insights({
//   username: "dc6923d5-decf-4bbb-8c3b-c82678cc4d0e",
//   password: "OUXdjZZ7MVBh",
//   version: 'v2'
// });
var r;
var app = express();

function testFirst(request, response, next)
{
	console.log("cheese");
	next();
}
function testSecond(request, response, next)
{
	console.log("ham");
}
function onRequest(request, response){
	console.log("A user made a request" + request.url);
	//response.write("here is some data"+ r);
	if(request.url == '/'){
		response.writeHead(200,{"Content-Type": "text/html"});
		fs.createReadStream("./view/index.html").pipe(response);
		//response.write("here is some data"+ r);
		response.end();
	}
}

app.get('/forum', (request, response) => {
  response.send('Hello from Express!')
})

app.listen(8888, (err) => {
  if (err) {
    return console.log('something bad happened', err)
  }

  console.log(`server is listening on ${8888}`)
})
//http.createServer(onRequest).listen(8888);


var personality_insights = new watson.personality_insights(auth.personality_insights);


personality_insights.profile({
  text: initialContent.dummyText,
  language: 'en' },

  function (err, response) {
    if (err)
      console.log('error:', err);
    else{
      console.log(JSON.stringify(response, null, 2));
      r = JSON.stringify(response);
    }
});