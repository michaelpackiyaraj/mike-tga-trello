var express = require("express");  
var path = require("path");  
var mongo = require("mongoose");   
var bodyParser = require('body-parser');   
var morgan = require("morgan");  
var db = require("../config/index.js");  
  
var app = express();  
var port = process.env.port || 2018;  
var srcpath  =path.join(__dirname,'/public') ;  
app.use(express.static('public'));  
app.use(bodyParser.json({limit:'5mb'}));    
app.use(bodyParser.urlencoded({extended:true, limit:'5mb'}));  
  
  
var mongoose = require('mongoose');  
var Schema = mongoose.Schema;  
var taskSchema = new Schema({      
    type: { type: String   },       
    list: { type: Array   },       
},{ versionKey: false });  
   
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

var model = mongoose.model('taskcollection', taskSchema);  
console.log(' model ', model);
//api for get data from database  
app.get("/trello/gettask",function(req,res){   
 model.find({},function(err,data){  
            if(err){ 
                res.send(err);  
            }  
            else{   
                res.send({data});  
                }  
        });  
})  
  
  
//api for Delete data from database  
app.post("/trello/removetask",function(req,res){   
 model.remove({ _id: req.body.id }, function(err) {  
            if(err){  
                res.send(err);  
            }  
            else{    
                   res.send({data:"Record has been Deleted..!!"});             
               }  
        });  
})  
  
  
//api for Update data from database  
/*app.post("/trello/updatetask",function(req,res){   
 model.findByIdAndUpdate(req.body.id, { name:  req.body.name, address: req.body.address, contact: req.body.contact,email:req.body.email },   
function(err) {  
 if (err) {  
 res.send(err);  
 return;  
 }  
 res.send({data:"Record has been Updated..!!"});  
 });  
})  */  
  
  
//api for Insert data from database  
app.post("/trello/addtask",function(req,res){   
       
    var mod = new model(req.body);  
        mod.save(function(err,data){  
            if(err){  
                res.send(err);                
            }  
            else{        
                 res.send({data:"Record has been Inserted..!!"});  
            }  
        });  
})  
      
// call by default index.html page  
app.get("*",function(req,res){   
    res.sendFile(srcpath +'/index.html');  
})  
  
//server stat on given port  
app.listen(port,function(){   
    console.log("server start on port"+ port);  
})  