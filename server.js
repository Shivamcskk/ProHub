const express =require('express');
const App =express();
const connectDB=require('./config/db');
const path=require('path');


connectDB();

App.use(express.json({extended:false}))


//define Routes
App.use('/api/users',require('./routes/api/users'));
App.use('/api/profile',require('./routes/api/profile'));
App.use('/api/posts',require('./routes/api/posts'));
App.use('/api/auth',require('./routes/api/auth'));

if(process.env.NODE_ENV==='production')
{
    App.use(express.static('client/build'));

    App.get('*',(req,res)=>{
        const index = path.join(__dirname, 'build', 'index.html');
        res.sendFile(index);
    } )
}

const PORT= process.env.PORT ||5000;
App.listen(PORT,()=>console.log(`server started on ${PORT}`))