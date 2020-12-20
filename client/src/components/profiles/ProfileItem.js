import React from 'react'
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom'
const ProfileItem = (props) => {
   
    return (
        <div className="profile bg-light" style={{minHeight:"35vh",marginLeft:"auto",marginRight:"auto"}}>
           <img className="round-img" style={{width:"80%",marginBottom:"10%"}} src={props.profile.user.avatar} alt=""/>
           <div style={{marginTop:"-12%"}}>
               <h2 style={{marginTop:"-2%"}}>{props.profile.user.name}</h2>
               <p>{props.profile.status} {props.profile.company && <span> at {props.profile.company}</span>}</p>
               <p style={{marginTop:'1%'}}>{props.profile.location && <span>{props.profile.location}</span>}</p>
               <Link to={`/profile/${props.profile.user._id}`} className='btn btn-primary' style={{borderRadius:"5px"}}>View Profile</Link>
           </div>
           <ul>
               <h3>Skill Set</h3>
               {props.profile.skills && props.profile.skills.slice(0,4).map((skill,index)=>(
                   <li key={index} className="text-success"  style={{background:"white",border:"solid 1px #d6d6d6"}}>
                       <i className="fas fa-check" style={{marginLeft:"10%"}}/><span>{skill}</span>
                   </li>
               ))}
           </ul>
          
        </div>
    )
}



export default ProfileItem;
