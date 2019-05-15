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
        const url = 'mongodb://localhost:27017';
        const dbName = 'libraryApp';
        (async function mongo() {
           let client;               
           
           try {
               client = await MongoClient.connect(url, { useNewUrlParser: true });
               const db = client.db(dbName);
               const response = await db.collection('books').insert(book);
               res.send(response);
               } catch (error) {
                res.send(error.message);
               }
          }());

    });
    
    return adminRoutes
}

module.exports = route;

