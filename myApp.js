let express = require('express');
require('dotenv').config();
let app = express();

console.log("Hello World");

app.use((req, res, next) => {
    let string = `${req.method} ${req.path} - ${req.ip}`;
    console.log(string);
    next();
});

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

//app.route(path).get(handler).post(handler)

app.get('/name', (req, res)=>{
    let {first: firstName, last: lastName} = req.query;
    res.json({
        "name" : `${firstName} ${lastName}`
    })
})





























 module.exports = app;
