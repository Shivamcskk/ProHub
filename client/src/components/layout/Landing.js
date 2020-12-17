import React from 'react'
import {Link,Redirect} from 'react-router-dom'
import {connect} from 'react-redux';
function Landing({isAuthenticated}) {
    if(isAuthenticated)
    {
      return <Redirect to='/dashboard'/>
    }
    return (
        <div class="landingg">
        <div class="dark-overlay">
          <div class="landing-inner">
          
            <p class="lead">
             Make a Profile,Connect With Users,Create Some Post And Enjoy!!
            </p>
            <div class="buttons">
            <Link to='/register'className="btn btn-success">Register</Link>
              <Link to='/login'className="btn btn-light">Login</Link>
            </div>
          </div>
      </div>
      </div>
    )
}
const mapStateToProps =state=>({
  isAuthenticated:state.auth.isAuthenticated
})
export default connect(mapStateToProps)(Landing);