///////////////EXPRESS SERVER/////////////////////////////////////////////
var express = require("express");//load express server
let app = express();//CPP
let appB = express();//BROWSER
const open = require("open");

let DATA = new Array("start");

////////////////////////////MULTIPROCESS THE SERVER//////////////////////////////////////////////



////////////////CPP CLIENT/////////////////////////////////////////////////////////
//basic struct app.METHOD(PATH, HANDLER)
//app=instance of express, METHOD: request type(get.post.put), PATH: server path, HANDER: function executed
app.get("/stream", (req, res) => {// "/stream" should be executed on exp:https://www.xxx.de/stream
    //handler entered when there is a matching route
    
    res.setHeader("Content-Type", "text/event-stream"); //most important in defining that your using SSE

    while(DATA.length > 0){
        toSend = DATA[0];
        res.write("data: " +  `${toSend}\n\n`);//message must be structured like this for SSE ("data: " + "\n\n")
        DATA.shift();
    }
});

app.get("/browser", (req, res) => { 
    open('http://localhost:8080/');
});

////////////////BROWSER CLIENT/////////////////////////////////////////////////////////
app.get("/", (req,res) => {
    res.sendFile('./index.html', {root:__dirname});
});

app.get("/senddata", (req, res) => {
    var temp = req.query.data;
    DATA = temp.split('');
    
    res.sendFile('./index.html', {root:__dirname});
    
});

app.listen(8080);
appB.listen(8800);
console.log("Listening on 8080");
console.log("Listening on 8800");
