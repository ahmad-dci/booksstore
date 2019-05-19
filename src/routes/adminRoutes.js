const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const adminRoutes = express.Router();

const books = [
    {
      title: 'War and Peace',
      genre: 'Historical Fiction',
      author: 'Lev Nikolayevich Tolstoy',
      read: false
    },
    {
      title: 'Les Misérables',
      genre: 'Historical Fiction',
      author: 'Victor Hugo',
      read: false
    },
    {
      title: 'The Time Machine',
      genre: 'Science Fiction',
      author: 'H. G. Wells',
      read: false
    },
    {
      title: 'A Journey into the Center of the Earth',
      genre: 'Science Fiction',
      author: 'Jules Verne',
      read: false
    },
    {
      title: 'The Dark World',
      genre: 'Fantasy',
      author: 'Henry Kuttner',
      read: false
    },
    {
      title: 'The Wind in the Willows',
      genre: 'Fantasy',
      author: 'Kenneth Grahame',
      read: false
    },
    {
      title: 'Life On The Mississippi',
      genre: 'History',
      author: 'Mark Twain',
      read: false
    },
    {
      title: 'Childhood',
      genre: 'Biography',
      author: 'Lev Nikolayevich Tolstoy',
      read: false
    }];
    
const book ={
    title: 'FBWIIHamburg2',
    genre: 'web development2',
    author: 'Amir',
    read: false
  }
function route(nav){
    adminRoutes.route('/').get((req, res)=>{
        const url = 'mongodb+srv://lion:jeny@cluster0-rmrmn.mongodb.net/test?retryWrites=true';
        const dbName = 'libraryApp';
        (async function mongo() {
           let client;               
           try {
               client = await MongoClient.connect(url, { useNewUrlParser: true });
               const db = client.db(dbName);
               const response = await db.collection('books').insert(book);
               res.send(response);
               client.close();
               } catch (error) {
                res.send(error.message);
               }
               
          }());

    });
   //show page
    adminRoutes.route('/addBook').get((req, res)=>{
       res.render('addBook', { nav, title:'Add Book' });
    });
    //
    adminRoutes.route('/addBook').post((req, res)=>{
      //res.render('addBook', { nav, title:'Add Book' });
      //req.body not gonna work without body parser package
      let errorMessage="";
      if(!req.body.bookTitle){
        errorMessage ="Please enter the Book title <br>";
      }
       if(!req.body.bookAuthor){
        errorMessage +="Please enter the Book Author <br>";
      } 
      if(!req.body.bookGenre){
        errorMessage +="Please enter the Book Genre <br>";
      }
      if(errorMessage!=""){
      res.send(errorMessage);
      }else{
        const url = 'mongodb://localhost:27017';
        const dbName = 'libraryApp';
        (async function mongo(){
          let client;
          try{
            client = await MongoClient.connect(url, {useNewUrlParser: true});
            const db = client.db(dbName);
            const response = await db.collection('books').insert({
              title: req.body.bookTitle,
              genre: req.body.bookGenre,
              author: req.body.bookAuthor,
              read: false
            });
            res.send(response);
          }  
          catch(error){
            res.send(error.message);
          }
          client.close();
        }());
      }
      //res.json(req.body.bookTitle);
   });
    return adminRoutes
}

module.exports = route;

