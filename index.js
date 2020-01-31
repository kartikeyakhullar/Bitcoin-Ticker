
// Basic Setup

const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");

const app = express();

app.use(bodyParser.urlencoded({extended : true}));


// Routes

app.get("/", function(req,res){
    res.sendFile(__dirname + "/index.html");
})

app.post("/", function(req,res){

    var crypto = req.body.crypto;
    var fiat = req.body.fiat;
    var amount = req.body.amount;

    var options = {
        url : "https://apiv2.bitcoinaverage.com/convert/global",
        method : "GET",
        qs : {
            from : crypto,
            to : fiat,
            amount : amount
        }

    }


    request(options, function(error,res,body){
        var data = JSON.parse(body);
        var price = data.price;
        var currentDate = data.time;
        res.send("<h1>" + amount + " " + crypto + " is worth " + price + " " + fiat + "</h1>");
    })

})


app.listen(3000, function(){
    console.log("Server started on 3000...");
})

