import React,{Fragment, useEffect} from 'react'
import {Link} from 'react-router-dom';
import {connect}  from 'react-redux'
import PropTypes from 'prop-types'
import {getProfilesById} from '../../actions/profile'
import Spinner from '../layout/Spinner'
import ProfileTop from './ProfileTop';
import ProfileAbout from './ProfileAbout';
import ProfileExperience from './ProfileExperience';
import ProfileEducation from './ProfileEducation';
const Profile = ({match,getProfilesById,profile:{profile,loading},auth}) => {
    
    useEffect(()=>{
        getProfilesById(match.params.id);
    },[getProfilesById])
    return (
        <Fragment>
            {profile===null || loading ? <Spinner/> :<Fragment>
                <Link to="/profiles" className='btn btn-primary'>
                    Back
                </Link>
                {auth.isAuthenticated && auth.loading===false && auth.user._id===profile.user._id && (
                    <Link to='/edit-profile' className='btn btn-dark' style={{color:"black"}}>Edit Profile</Link>
                )}
                <div className="profile-grid my-1">
                    <ProfileTop profile={profile}/>
                    <ProfileAbout profile={profile}/>
                    <div class="profile-exp bg-white p-2">
                    <h2 class="text-primary">Experience</h2>
                    {profile.experience.length>0 ?(
                        <Fragment>
                            {profile.experience.map(exp=>(
                                <ProfileExperience key={exp._id}
                                experience={exp}/>
                            ))}
                        </Fragment>):(
                            <h4>No Experience Credentials</h4>
                        )
                    }
                    </div>
                </div>
               
                    <div class="profile-edu bg-white p-2">
                    <h2 class="text-primary">Education</h2>
                    {profile.education.length>0 ?(
                        <Fragment>
                            {profile.education.map(edu=>(
                                <ProfileEducation key={edu._id}
                               education={edu}/>
                            ))}
                        </Fragment>):(
                            <h4>No Education Credentials</h4>
                        )
                    }
                   
                </div>
                </Fragment>}
        </Fragment>
    )
}


const mapStateToprops=state=>({
    profile:state.profile,
    auth:state.auth
})
export default connect(mapStateToprops,{getProfilesById})(Profile)
