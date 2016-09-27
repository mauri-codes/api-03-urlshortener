//C:\Program Files\MongoDB\Server\3.2\bin
//mongod --port 27017 --dbpath "D:\Programming Projects\URL Shortener\data\db"
var express = require("express");
var http = require("http");
var validUrl = require("valid-url");
var mongoose = require("mongoose");

var app = express();

//mongoose.connect("localhost:27017/test");
mongoose.connect("mongodb://mauri1789:fccfcc@ds021356.mlab.com:21356/fcc");
var Schema = mongoose.Schema;

var urlSchema = mongoose.Schema({
    number: {type: String, required: true},
    url: String,
    createdAt: {type: Date, default: Date.now}
});


var urlData = mongoose.model("urlData", urlSchema);

app.set("port", process.env.PORT || 3000);

app.get("/", function (request, response) {
    response.send("Hello World!");
});
app.get("/https://:url", function (request, response) {
    var rand = parseInt(Math.random() * (50000 - 10000) + 10000);
    var myURL = "https://" + request.params.url;
    if(validUrl.isUri(myURL)){
        var item = {
            number: rand,
            url: myURL
        };
        var data = new urlData(item);
        data.save();

        response.send("the url is  https://api-03-urlshortener/" + rand);
    }
    else
        response.send("it is not a url :(  " + myURL);
});
app.get("/http://:url", function (request, response) {
    var rand = parseInt(Math.random() * (50000 - 10000) + 10000);
    var myURL = "http://" + request.params.url;
    if(validUrl.isUri(myURL)){
        var item = {
            number: rand,
            url: myURL
        };
        var data = new urlData(item);
        data.save();
        response.send("the url is  https://api-03-urlshortener/" + rand);
    }
    else
        response.send("it is not a url :(  " + myURL);
});
app.get("/:url", function (request, response) {
    var data = parseInt(request.params.url);
    if(Number.isInteger(data)){
        urlData.findOne({"number": data+""}, function (err, theurl) {
            if(err) return handleError(err);
            response.redirect(theurl.url);
        });
    }
    else{
        response.send("Site not found")
    }
});
app.listen(app.get("port"), function () {
    console.log("Express app started on port " + app.get("port"));
});
