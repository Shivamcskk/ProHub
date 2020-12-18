const express=require('express');
const router =express.Router();
const auth=require('../../middleware/auth')
const Profile=require('../../models/Profile');
const User=require('../../models/User');
const Post=require('../../models/Post');
const {check,validationResult}=require('express-validator')
const request=require('request');
const config=require('config');
//route GEt api/public/me
// Get current user
// private
router.get('/me',auth,async(req,res)=>{
   try{
    const profile=await Profile.findOne({user:req.user.id}).populate('user', ['name', 'avatar']);
    if(!profile){
        return res.status(400).json({msg:"There is no profile for this user"})
    }
    res.json(profile);
   }
   catch(err)
   {
       console.error(err.message);
       res.status(500).send('server error');
   }
});
router.post('/',[auth,[check('status','Status is required').not().isEmpty(),
check('skills',"Skills is required").not().isEmpty()]],
async(req,res)=>{
        const errors=validationResult(req);
        if(!errors.isEmpty())
        {
            return res.status(400).json({errors:errors.array()})
        }
        const {
            company,website,location,bio,status,githubusername,skills,youtube,facebook,twitter,instagram,linkedin

        }=req.body;
        
        const ProfileFields={};
        ProfileFields.user=req.user.id;
        if(company)ProfileFields.company=company;
        if(website)ProfileFields.website=website;
        if(location)ProfileFields.location=location;
        if(bio)ProfileFields.bio=bio;
        if(status)ProfileFields.status=status;
        if(githubusername)ProfileFields.githubusername=githubusername;
        if(skills)
        {
            
            ProfileFields.skills=skills.split(',').map(skill=>skill.trim());
        
        }

        ProfileFields.social={};
        if(youtube)ProfileFields.social.youtube=youtube;
        if(twitter)ProfileFields.social.twitter=twitter;
        if(facebook)ProfileFields.social.facebook=facebook;
        if(linkedin)ProfileFields.social.linkedin=linkedin;
        if(instagram)ProfileFields.social.instagram=instagram;
        
        try{
            let profile=await Profile.findOne({user:req.user.id});
            //update
            if(profile)
            {
                profile=await Profile.findOneAndUpdate({user:req.user.id},
                {$set:ProfileFields},
                {new:true});
                return res.json(profile);
            } 
            //create
             profile=new Profile(ProfileFields);
            await profile.save();
            res.json(profile);
        }
        catch(err)
        {
            console.error(err.message);
            res.status(500).send('server error')
        }

});
router.get('/',async(req,res)=>{
    try {
        const profiles=await Profile.find().populate('user', ['name', 'avatar']);
        res.json(profiles);
    } catch (err) {
        console.log(err.message);
        res.status(500).send('server error')
    }
});

router.get('/user/:user_id',async(req,res)=>{
    try {
        const profile=await Profile.findOne({user:req.params.user_id}).populate('user', ['name', 'avatar']);
       if(!profile)
       {
           return res.status(400).json({msg:"Profile not found"})
       }
        res.json(profile);
    } catch (err) {
        console.log(err.message);
        if(err.kind=='ObjectId')
        {
            return res.status(400).json({msg:"Profile not found"})
        }
        res.status(500).send('server error')
    }
});

router.delete('/',auth,async(req,res)=>{
    try {
        await Profile.findOneAndRemove({user:req.user.id});
        await Post.deleteMany({user:req.user.id});
        await User.findOneAndRemove({_id:req.user.id});
        res.json({msg:"user Deleted"});
    } catch (err) {
        console.log(err.message);
        res.status(500).send('server error')
    }
});
router.put('/experience',[auth,[check('title',"Title is required").not().isEmpty()
,check('company',"Company is required").not().isEmpty(),
check('from',"From date is required").not().isEmpty()
]],async(req ,res)=>{
const errors=validationResult(req);
if(!errors.isEmpty())
{
    return res.status(400).json({errors:errors.array()})
}


    const{
        title,
        company,
        location,
        from,
        to,
        current,
        description

    }=req.body;

    const newExp={
        title,
        company,
        location,
        from,
        to,
        current,
        description

    }

    try {
        const profile=await Profile.findOne({user:req.user.id});
        profile.experience.unshift(newExp);
        await profile.save();
        res.json(profile);
        
    } catch (err) {
        console.error(err.message);
        res.status(500).send('server error');
        
    }
})
router.delete('/experience/:exp_id',auth,async(req,res)=>{
    try {
        const profile=await Profile.findOne({user:req.user.id});
        const removeIndex=profile.experience.map(item=>item.id).indexOf(req.params.exp_id);
        profile.experience.splice(removeIndex,1);
        await profile.save();
        res.json(profile);

    } catch (err) {
        console.error(err.message);
        res.status(500).send('server error');
    }
});


router.put('/education',[auth,[check('school',"School is required").not().isEmpty()
,check('degree',"Degree is required").not().isEmpty(),
check('from',"From date is required").not().isEmpty(),
check('fieldofstudy',"field of study is required").not().isEmpty()
]],async(req ,res)=>{
const errors=validationResult(req);
if(!errors.isEmpty())
{
    return res.status(400).json({errors:errors.array()})
}


    const{
        school,
        degree,
        fieldofstudy,
        from,
        to,
        current,
        description

    }=req.body;

    const newEdu={
        school,
        degree,
        fieldofstudy,
        from,
        to,
        current,
        description

    }

    try {
        const profile=await Profile.findOne({user:req.user.id});
        profile.education.unshift(newEdu);
        await profile.save();
        res.json(profile);
        
    } catch (err) {
        console.error(err.message);
        res.status(500).send('server error');
        
    }
})
router.delete('/education/:edu_id',auth,async(req,res)=>{
    try {
        const profile=await Profile.findOne({user:req.user.id});
        const removeIndex=profile.education.map(item=>item.id).indexOf(req.params.edu_id);
        profile.education.splice(removeIndex,1);
        await profile.save();
        res.json(profile);

    } catch (err) {
        console.error(err.message);
        res.status(500).send('server error');
    }
});
router.get('/github/:username',(req,res)=>{
    try {
        const options={
            uri:`https://api.github.com/users/${req.params.username}/repos?per_page=5&sort=created:asc&client_id=${config.get('githubClientId')}&client_secret=${config.get('githubSecret')}`
            ,method:'Get',
            headers:{'user-agent':'node.js'}
        };
        request(options,(error,response,body)=>{
            if(error)console.log(error);
            if(response.statusCode!==200)
            {
               return res.status(404).json({msg:"NO github profile found"});
            }
            res.json(JSON.parse(body));
        })

    } catch (err) {
        console.log(err.message);
        res.status(500).send('server error');
        
    }
})
module.exports=router;