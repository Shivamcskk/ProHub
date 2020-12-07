const express =require('express');
const App =express();
App.get('/',(req,res)=>res.send('Api Running'))
const PORT=5000 || process.env.PORT;
App.listen(PORT,()=>console.log(`server started on ${PORT}`))