const express=require('express');
const router =express.Router();
const auth=require('../../middleware/auth');
const User = require('../../models/User');
const {check,validationResult} =require('express-validator');
const bcrypt=require('bcryptjs');
const jwt =require('jsonwebtoken');
const config=require('config');
//route GEt api/auth
// test route
// public
router.get('/',auth,async(req,res)=>{
    try{
        const user=await User.findById(req.user.id).select('-password');
        res.json(user);
    }
    catch(err)
    {
        console.log(err.message);
        res.status(500).send('server Error')
    }
});

//route Post api/auth
// authenticate users
// public
router.post('/',[
   
    check('email','Please include a valid email').isEmail(),
    check('password','password required').exists()
],async(req,res)=>{
   const errors=validationResult(req);
   if(!errors.isEmpty())
   {
       return res.status(400).json({errors:errors.array()});
   }
   const {name,email,password}=req.body;
   try{

    let user=await User.findOne({email});
    if(!user)
    {
      return res.status(400).json({errors:[{msg:'Invalid Credentails'}]})
    }
   
  const isMatch=await bcrypt.compare(password,user.password);
  if(!isMatch)
  {
    return res.status(400).json({errors:[{msg:'Invalid Credentails'}]})
  }
  
        const payLoad={
            user:{
                id:user.id
            }
        }
        jwt.sign(payLoad,config.get('jwtsecret'),{expiresIn:360000},(err,token)=>{
            if(err)throw err;
            res.json({token});
        })
   
   }
   catch(err)
   {
        console.log(err.message);
        res.status(500).send("something is wrong with server")
   }

    
})
module.exports=router;