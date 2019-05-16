const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;

const booksRoutes = express.Router();

function route(nav) {
  booksRoutes.route('/').get((req, res) => {
    const url = 'mongodb://localhost:27017';
    const dbName = 'libraryApp';
    (async function mongo() {
      let client;
      try {
        client = await MongoClient.connect(url, {
          useNewUrlParser: true
        });
        const db = client.db(dbName);
        const col = await db.collection('books');
        const books = await col.find().toArray();
        //console.log(books);
        res.render('books', {
          title: "Books List",
          nav,
          books: books
        });
      } catch (error) {
        res.send(error.message);
      }
      client.close();
    }());

  });
  booksRoutes.route('/:id').get((req, res) => {
    const id = req.params.id;
    const url = 'mongodb://localhost:27017';
    const dbName = 'libraryApp';
    (async function mongo() {
      let client;
      try {
        client = await MongoClient.connect(url, {useNewUrlParser: true});
        const db = client.db(dbName);
        const col = await db.collection("books");
        const singleBook =await col.findOne({_id: new ObjectID(id)});
        console.log(singleBook);
        if(singleBook !=null){
        res.render('singleBook', {
          nav,
          book: singleBook
        });
      }else{
        res.send(`404 there is no book with Id ${id}`);
      }
      } catch (error) {
        res.send(error.message);
      }
      client.close();
    }());
  });
  
  return booksRoutes;
}
module.exports = route;