// ==================
// simple server
// ====================

// const http = require('http');

// const server = http.createServer((req, res) => {
//    res.write('Welcome to crish backend journey');
//    res.end();
// });

// server.listen(3000, () => {
//    console.log('Server Running from http:localhost:3000');
   
// });



// ===========
// Raw http node
// ===========

// const http = require('http');

// const server = http.createServer((req,res) => {
//    if(req.url === '/'){
//       res.end('Home page')
//    }
//    else if (req.url === '/about'){
//       res.end('About page')
//    }
//    else if(req.url ==='/service') {
//       res.end('Service page') 
//    }
//    else if (req.url === '/contact'){
//       res.end('Contact page')
//    }
//    else{
//       res.end('404 Page not found')
//    }
// });

// server.listen(3000, (req,res) => {
//    console.log('Server Running from http:localhost:3000');
   
// })



// =============================
// Create server with express.js
// =============================

// const express = require('express');
// const app = express();

// app. get('/', (req,res) => {
//    res.send('Home Page')
// });

// app.get('/about', (req,res) => {
//    res.send('About page')
// });

// app.get('/contact', (req,res) => {
//    res.send('Contact page')
// });

// app.listen(3000, () => {
//    console.log('Server Running from http:localhost:3000');
// })




// ==========================
// Building Real APIs (JSON)
// ==========================

// const express = require('express');
// const app = express();

// app.use(express.json())


// app.get('/', (req,res) => {
//    res.send('Api ir running...')
// });

// // Api route
// app.get('/api/users', (req,res) => {
//    const users = [
//       {id: 1, firstName: 'toheeb', lastName: 'shittu'},
//       {id: 2, firstName: 'abbey', lastName: 'lijadu'},
//       {id: 3, firstName: 'sophia', lastName: 'baalogun'},
//       {id: 4, firstName: 'faithia', lastName: 'omoniyi'}
//    ]
//    res.json(users)
// });

// app.get('/api/products', (req,res) => {
//    const products = [
//       {id: 1, name: 'laptop', prise: '$200'},
//       {id: 2, name: 'phone', prise: '$150'},
//    ]
//    res.json(products)
// });

// app.listen(3000, () =>{
//    console.log('Server Running from http:localhost:3000');
   
// });



// ============================
// Post Request + Sending data
// ============================

// const express = require ('express');
// const app = express();

// app.use(express.json());


// let users = [
//    {id: 1, name: 'ayo', age: 20},
//    {id: 2, name: 'Ade', age: 19},
//    {id: 3, name: 'Oyin', age: 21}
// ]

// app.get('/api/users', (req, res) => {
//    res.json(users)
// });

// app.post('/api/users', (req,res)=> {
//    const newUser = {
//       id: users.length + 1,
//       name: req.body.name,
//       age: req.body.age
//    }

//    users.push(newUser);
//    res.json(newUser)
// });
// // =========================
// // Beginner method
// // =========================

// // app.delete('/api/users/:id', (req,res) =>{
   
//    //     const id = parseInt(req.params.id)
   
//    //     users = users.filter(user => user.id !== id)
   
//    //     res.json({msg: 'User deleted successfully'})
//    // })
   
   
// // =========================
// // Proffessional method
// // =========================
// app.delete('/api/users/:id',(req,res) =>{
//    const id = parseInt(req.params.id)

//    userExit = users.find(user => user.id === id)
//    if(!userExit){
//       return res.status(404).send({msg: '404 not found'})
//    };

//    users = users.filter(user => user.id !== id)
//    res.json({msg: 'User deleted successfully'});
// })

// app.listen(3000, ()=> {
//    console.log('App Running from http:localhost:3000');
   
// })



require('dotenv').config();

const express = require('express');

const app = express();

const mongoose = require('mongoose');

const PORT = process.env.PORT || 3000



app.use(express.json());

const userRouters = require('./routes/userRoutes');
const authRoutes = require ('./routes/authRoutes');

app.use('/api/users', userRouters);
app.use('/api/auth', authRoutes);

mongoose.connect(process.env.MONGO_URI)
.then(() => console.log('MongoDB connected successfully'))
.catch(err => console.log(err));


app.listen(PORT, () => {
   console.log(`Server running on port ${PORT}` );
   
})


console.log(process.env.PORT);
console.log(process.env.MONGO_URI);
