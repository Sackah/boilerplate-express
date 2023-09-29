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
































 module.exports = app;
