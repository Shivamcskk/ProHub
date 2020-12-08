const express =require('express');
const App =express();
const connectDB=require('./config/db');


connectDB();

App.use(express.json({extended:false}))

App.get('/',(req,res)=>res.send('Api Running'))

//define Routes
App.use('/api/users',require('./routes/api/users'));
App.use('/api/profile',require('./routes/api/profile'));
App.use('/api/posts',require('./routes/api/posts'));
App.use('/api/auth',require('./routes/api/auth'));


const PORT=5000 || process.env.PORT;
App.listen(PORT,()=>console.log(`server started on ${PORT}`))