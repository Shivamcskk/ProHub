import React from 'react'
import {Link} from 'react-router-dom'
function Landing() {
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
export default Landing;