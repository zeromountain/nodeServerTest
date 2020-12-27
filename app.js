const { request } = require('express');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');

app.listen(3000, function() {
  console.log("start!! express server on port 3000!");
})

// public 파일의 static 파일들을 express에 등록 
app.use(express.static('public'));
// using bodyParser
app.use(bodyParser.json());
// 특수 기호 => 다른 문자로 치환 처리
app.use(bodyParser.urlencoded({extneded:true}));
app.set('view engine', 'ejs');
app.use(cors());
// enable all cors requests
app.get('/ajax_send_email', function(req,res){
  res.json({msg: 'This is CORS-enabled for all origins!'})
})
app.listen(80, function() {
  console.log('CORS-enabled web server listening on port 80');
})

//url routing
app.get('/', function(req, res) {
  console.log('test');
  // res.send("<h1>Hello friend!</h1>")
  res.sendFile(__dirname + "/public/main.html");
})


app.get('/main', function(req, res) {
  // res.send("<h1>Hello friend!</h1>")
  res.sendFile(__dirname + "/public/main.html");
})

// form routing
app.post('/email_post', function(req, res) {
  // get: req.param('email')
  console.log(req.body.email);
  // res.send("<h1>welcome!" + req.body.email + "</h1>" );
  res.render('email.ejs', {'email' : req.body.email});
})

app.post('/ajax_send_email', function(req, res) {
  console.log(req.body.email);
  // check validation about input value => select DB
  var responseData = {'result' : 'ok', 'email' : req.body.email}
  res.json(responseData);
})