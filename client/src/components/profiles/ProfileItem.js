import React from 'react'
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom'
const ProfileItem = (props) => {
   
    return (
        <div className="profile bg-light">
           <img className="round-img" src={props.profile.user.avatar} alt=""/>
           <div>
               <h2>{props.profile.user.name}</h2>
               <p>{props.profile.status} {props.profile.company && <span> at {props.profile.company}</span>}</p>
               <p className='my-1'>{props.profile.location && <span>{props.profile.location}</span>}</p>
               <Link to={`/profile/${props.profile.user._id}`} className='btn btn-success'>View Profile</Link>
           </div>
           <ul>
               {props.profile.skills && props.profile.skills.slice(0,4).map((skill,index)=>(
                   <li key={index} className="text-success">
                       <i className="fas fa-check"/>{skill}
                   </li>
               ))}
           </ul>
          
        </div>
    )
}



export default ProfileItem;
