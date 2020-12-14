import React,{Fragment,useState} from 'react'
import { Link, Redirect } from 'react-router-dom';
import {connect} from 'react-redux';
import PropTypes from 'prop-types'
import {login} from '../../actions/auth';
 function Login ({login,isAuthenticated})  {
     const [FormData,setFormData]=useState({
         email:"",
         
         password:""
   
     })
     const {email,password}=FormData;
     const onChange =(e)=>{
     
        setFormData({...FormData,[e.target.name]:e.target.value})
     }
     const onSubmit =(e)=>{
       console.log(email,password)
            e.preventDefault();
           login(FormData);
            
     };

     if(isAuthenticated){
       return <Redirect to='/dashboard'/>
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
Login.prototype={
  login:PropTypes.func.isRequired,
  isAuthenticated:PropTypes.bool.isRequired,
}
const mapStateToProps=state=>({
    isAuthenticated:state.auth.isAuthenticated
})
export default connect(mapStateToProps,{login})(Login);