const express=require('express');
const router =express.Router();
const {check,validationResult} =require('express-validator');
const gravatar=require('gravatar');
const User=require('../../models/User');
const bcrypt=require('bcryptjs');
const jwt =require('jsonwebtoken');
const config=require('config');

//route Post api/users
// test route
// public
router.post('/',[
    check('name',"Name is required").not().isEmpty(),
    check('email','Please include a valid email').isEmail(),
    check('password','please enter a password with 6 or more characters').isLength({min:6})
],async(req,res)=>{
   const errors=validationResult(req);
   if(!errors.isEmpty())
   {
       return res.status(400).json({errors:errors.array()});
   }
   const {name,email,password}=req.body;
   try{

    let user=await User.findOne({email});
    if(user)
    {
      return res.status(400).json({errors:[{msg:'user already exists'}]})
    }
    const avatar=gravatar.url(email,{
        s:'200',
        r:'pg',
        d:'mm'
    })
    user=new User(
        {
            name,
            email,
            avatar,
            password
        }
    );
    const salt =await bcrypt.genSalt(10);
    user.password=await bcrypt.hash(password,salt);
   await user.save();

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