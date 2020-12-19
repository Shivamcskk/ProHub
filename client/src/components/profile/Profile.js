import React,{Fragment, useEffect} from 'react'
import {Link} from 'react-router-dom';
import {connect}  from 'react-redux'
import PropTypes from 'prop-types'
import {getProfilesById} from '../../actions/profile'
import Spinner from '../layout/Spinner'
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
                </Fragment>}
        </Fragment>
    )
}


const mapStateToprops=state=>({
    profile:state.profile,
    auth:state.auth
})
export default connect(mapStateToprops,{getProfilesById})(Profile)
