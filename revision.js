// ==========================
   // Simple server
// ==========================

// const http = require ('http');
// const app = http();

// const server = http.createServer ((req,res) =>{
//    res.write('This is my revsion from simple server')
//    res.end()
// })

// server.listen(3000, () =>{
//    console.log('Server running fro simple server');
   
// })



// ==========================
   // RAW http server
// ==========================

// const http = require ('http');

// const server = http.createServer((req,res) => {
   //    if(req.url === '/') {
      //       res.end('User 1')
//    }
//    else if (req.url === '/2'){
//       res.end('User 2')
//    }
//    else{
//       console.log('404 notfound');
      
//    }
// })

// server.listen(3000, () =>{
//    console.log('Runing from revision');
   
// });




// ==========================
   //express server
// ==========================

// const express = require ('express');
// const app = express()

// app.get('/', (req,res) => {
//    res.send('hi')
// })

// app.get('/api/users', (req, res) =>{
//    const users = [
//       {id:1, name:'ayo'},
//       {id:1, name:'ayo'}
//    ]
//    res.json()
// })

// app.listen(3000, ()=>{
//    console.log('Running from port 3000');
   
// })


// ==========================
   //Revision
// ==========================

const express = require ('express');
const app = express();

app.use(express.json());

let users = [
   {id: 1, name:'babalola'},
   {id: 2, name:'arike'}
];

app.get('/api/users', (req,res) => {
   res.json(users)
});

app.post('/api/users', (req,res) => {
   const newUser ={
      id: users.length + 1,
      name: req.body.name
   }
   users.push(newUser)
   res.json(newUser)
});

app.delete('/api/users/:id', (req,res) => {
   const id = parseInt(req.params.id)

   const userExit = users.find(user => user.id === id)
   if(!userExit){
      res.status(404).send({msg: '404 not found'});
   }

   users = users.filter(user => user.id !== id)
   res.json({msg: 'User deleted successfully'})
});

app.listen (4000, () => {
   console.log('Server running from http://localhost:4000');
   
})