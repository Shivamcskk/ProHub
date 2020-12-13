import React from 'react'
import {Link} from 'react-router-dom'
function Navbar() {
    return (
        <nav className="navbar" style={{backgroundColor:"#0d1117"}}>
      <h1>
        <Link to='/'><i className="fas fa-rocket"></i> ProHub</Link>
      </h1>
      <ul>
        <li><Link to='!#'>Users</Link></li>
        <li><Link to='/register'>Register</Link></li>
        <li><Link to='/login'>Login</Link></li>
      </ul>
    </nav>
    )
}
export default Navbar;