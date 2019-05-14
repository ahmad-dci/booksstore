const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const adminRoutes = express.Router();

function route(nav){
    adminRoutes.route('/').get((req, res)=>{
        const url = 'mongodb://localhost:27017';
        const dbName = 'libraryApp';
        (async function mongo() {
           let client;               
           
           try {
               client = await MongoClient.connect(url);
               res.send("connection done");
               } catch (error) {
                res.send(error.message);
               }
          }());

    });
    
    return adminRoutes
}

module.exports = route;

