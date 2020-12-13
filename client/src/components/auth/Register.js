import React,{Fragment,useState} from 'react'
import { Link } from 'react-router-dom';
import {connect} from 'react-redux';
import {setAlert} from '../../actions/alert'
import PropTypes from 'prop-types'

 function Register (props)  {
     const [FormData,setFormData]=useState({
         email:"",
         name:"",
         password:"",
         password2:""
     })
     const {name,email,password,password2}=FormData;
     const onChange =(e)=>{
     
        setFormData({...FormData,[e.target.name]:e.target.value})
     }
     const onSubmit =async(e)=>{
            e.preventDefault();
           if(password!==password2)
           {
            props.setAlert('Password doesnot match','danger')
               
           }
           else
           {
               console.log('success')
            }
     }
    return (
      
            <Fragment>
                <h1 
                style={{textAlign:"center",color:"rgb(13, 17, 23)"}}
                className="large">Welcome New Friend!</h1>
      <p className="lead" style={{textAlign:"center",color:"green"}}><i className="fas fa-comment-alt"></i> Create Your Account</p>
      <form className="form" style={{width:"50%",alignContent:"center",margin:"0 auto"}} onSubmit={onSubmit}>
        <div className="form-group">
          <input type="text" placeholder="Name" name="name" value={FormData.name} onChange={e=>onChange(e)} required />
        </div>
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
        <div className="form-group">
          <input
            type="password"
            placeholder="Confirm Password"
            name="password2"
            minLength="6"
            value={FormData.password2} onChange={e=>onChange(e)}
          />
        </div>
        <input type="submit" className="btn btn-success" value="Register" />
      </form>
      <p className="my-1" style={{textAlign:"center"}}>
        Already have an account? <Link  style={{color:"red"}}
        href="/login">Sign In</Link>
      </p>
    
            </Fragment>
      
    )
}
Register.prototype={
  setAlert:PropTypes.func.isRequired
}
export default connect(null,{setAlert})(Register);