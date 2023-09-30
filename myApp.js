let express = require('express');
require('dotenv').config();
let bodyParser = require('body-parser');
let app = express();

console.log("Hello World");

app.use((req, res, next) => {
    let string = `${req.method} ${req.path} - ${req.ip}`;
    console.log(string);
    next();
});

app.use((bodyParser.urlencoded({extended : false})));

app.use(bodyParser.json());

app.get("/", (req, res)=>{
    //res.send("Hello Express");
    res.sendFile(__dirname + "/views/index.html");
});

app.use('/public', express.static(__dirname + '/public'));

app.get('/json', (req, res)=>{
    var response;

    if(process.env.MESSAGE_STYLE === 'uppercase'){
        response = "Hello json".toUpperCase();
    }else{
        response = "Hello json"
    }

    res.json({
        "message" : response
    });
});

app.get('/now', (req, res, next)=>{
    req.time = new Date().toString();
    next();
}, (req, res, next)=>{
    res.json({
        "time" : req.time
    })
});

app.get('/:word/echo', (req, res, next)=>{
    let route = req.params.word;
    res.json({
        "echo" : route
    })
});

/*app.get('/name', (req, res)=>{
    let {first: firstName, last: lastName} = req.query;
    res.json({
      "name" : `${firstName} ${lastName}`
    })
  });
app.use(bodyParser.json());*/

app.route('/name').get((req, res)=>{
    let {first: firstName, last: lastName} = req.query;
    res.json({
      "name" : `${firstName} ${lastName}`
    })
  }).post((req, res)=>{
    let resolve = `${req.body.first} ${req.body.last}`;
    res.json({
        "name": resolve
    })
  });






























 module.exports = app;
