// jshint esversion:6

const express = require("express");

const bodyParser = require("body-parser");

const request = require("request");

const https = require("https");

const app = express();

app.use(express.static("public"));
app.use('/css', express.static(__dirname + 'public/css'))
app.use('/img', express.static(__dirname + 'public/img'))
app.use('/js', express.static(__dirname + 'public/js'))
app.use(bodyParser.urlencoded({extended: true}));

// views
app.set('views', './views');
app.set('view engine', 'ejs');



app.get("/", function(req, res){
    res.render("index");
});

app.get("/about", function(req, res){
    res.render("about");

});

app.get("/success", function(req, res){
    res.render("success");
});

app.get("/failure", function(req, res){
    res.render("failure");
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

        if(response.statusCode==200) {
            res.render("success")
        } else {
            res.render("failure")
        }
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

