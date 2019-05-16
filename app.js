const express = require('express');
const bodyParser = require('body-parser');

const app = express();
// body parser to parse the requist so we can get the posted data and other 
// information from it 
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


const port = process.env.PORT || 3000;
const path = require('path');
const date = require('./src/routes/date');


app.use(express.static(path.join(__dirname,'public')));
app.set('views', path.join(__dirname, 'src/views'));
app.set('view engine', 'ejs');
// another view engine called jade

// rout system one main rout and sub and sub of the sub

// const booksRoutes = express.Router();
// const subbooksRoutes = express.Router();
// booksRoutes.route('/').get((req, res)=>{
//   res.send("I am Booksroutes worker");
// });
// subbooksRoutes.route('/').get((req, res)=>{
//   res.send("I am tes1 from subbooksRoutes");
// });
// subbooksRoutes.route('/test3').get((req, res)=>{
//   res.send("I am tes3 from subbooksRoutes");
// });
// booksRoutes.use('/test1',subbooksRoutes);
// app.use('/test',booksRoutes);


// end route system
const nav = [{title: "Books2", link: "/books"},
            {title: "Authors", link: "/authors"}];
const booksRoutes = require('./src/routes/booksRoutes')(nav);
    app.use('/books',booksRoutes);
    const adminRoutes = require('./src/routes/adminRoutes')(nav);
    app.use('/admin',adminRoutes );
app.get('/authors', (req, res)=>{
    res.send("Hello authors");
    });
    // next route is to show how module works
app.get('/date', (req, res)=>{
res.send(date.getDate);
});

app.get('/', (req, res)=>{
    //res.send("Hello Ahmad");
    res.render('index',{title: "Book Store", nav  });
});



app.listen(port, ()=>{console.log(`Server is running on port ${port}`);})
