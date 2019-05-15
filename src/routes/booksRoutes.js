const express = require('express');
const MongoClient = require('mongodb').MongoClient;

 const booksRoutes = express.Router();
function route(nav) {  
    booksRoutes.route('/').get((req, res)=>{
      const url = 'mongodb://localhost:27017';
        const dbName = 'libraryApp';
        (async function mongo(){
          let client; 
          try {
            client = await MongoClient.connect(url, { useNewUrlParser: true });
            const db = client.db(dbName);
            const col = await db.collection('books');
            const books = await col.find().toArray();
            console.log(books);
            res.render('books',{title: "Books List", nav,books: books });
          } catch (error) {
            res.send(error.message);
          }

        }());
      
    });
    booksRoutes.route('/:id').get((req, res)=>{
      res.render('singleBook',{ nav,book: books[req.params.id] });
    });
    return booksRoutes;
}
    module.exports=route;
    