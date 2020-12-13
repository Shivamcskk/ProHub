import React,{Fragment,useState} from 'react'
import { Link } from 'react-router-dom';

 function Login ()  {
     const [FormData,setFormData]=useState({
         email:"",
         
         password:""
   
     })
     const {email,password}=FormData;
     const onChange =(e)=>{
     
        setFormData({...FormData,[e.target.name]:e.target.value})
     }
     const onSubmit =async(e)=>{
            e.preventDefault();
           
               console.log('success')
            
     }
    return (
      
            <Fragment>
                <h1 
               style={{textAlign:"center",color:"rgb(13, 17, 23)"}}
                className="large  text-dark">Welcome Again!</h1>
      <p className="lead" style={{textAlign:"center",color:"green"}}><i className="fas fa-comment-alt"></i> Login Into Your Account</p>
      <form className="form" style={{width:"50%",alignContent:"center",margin:"0 auto"}} onSubmit={onSubmit}>
       
        <div className="form-group">
          <input type="email" placeholder="Email Address" name="email" value={FormData.email} onChange={e=>onChange(e)} />
          
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Password"
            name="password"
            minLength="6"
            value={FormData.password} onChange={e=>onChange(e)}
          />
        </div>
        
        <input type="submit" className="btn btn-success" value="Login" />
      </form>
      <p className="my-1" style={{textAlign:"center"}}>
        Dont have an account? <Link  style={{color:"red"}}
        href="/register">log In</Link>
      </p>
    
            </Fragment>
      
    )
}
export default Login;