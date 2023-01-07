// jshint esversion:6

const express = require("express");

const bodyParser = require("body-parser");

const request = require("request");

const https = require("https");

const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));



app.get("/", function(req, res){
    res.sendFile(__dirname + "/index.html");
});

app.post("/", function(req, res) {

    var firstName = req.body.fname;
    var lastName = req.body.lname;
    var Email = req.body.email;

    var data = {
        members: [
           
            {
                email_address: Email,
                status: "subscribed",
                merge_fields: {
                FNAME: firstName,
                LNAME: lastName
                }
                
            }
        ]

    };

         var jsonData = JSON.stringify(data);

         var url = "https://us17.api.mailchimp.com/3.0/lists/dfecc024b5";

    var options = {
        method: "POST",
        auth: "KalaiVanan:743bcd55de15c11f9df364e83186d7ce-us17"

    }

    const request =  https.request(url, options, function(response){
        response.on("data", function(data){
            console.log(JSON.parse(data));
        })
     })

     request.write(jsonData);
     request.end();

    
});


app.listen(process.env.PORT || 5050, function(){
    console.log("Server is Started on port 5050");
});

// 743bcd55de15c11f9df364e83186d7ce-us17

// dfecc024b5