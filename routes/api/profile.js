const express=require('express');
const router =express.Router();


//route GEt api/public
// test route
// public
router.get('/',(req,res)=>{
    res.send('public route');
})
module.exports=router;