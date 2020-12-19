import React,{Fragment,useEffect} from 'react';
import ProfileItem from './ProfileItem'
import Spinner from '../layout/Spinner';
import {connect} from 'react-redux';
import {getProfiles} from '../../actions/profile'
import PropTypes from 'prop-types'

const Profiles = ({getProfiles,profile:{profiles,loading}}) => {
    useEffect(()=>{
        getProfiles();
    },[getProfiles]);
    return (
        <Fragment>
            {
                loading ? <Spinner/> :<Fragment>
                    <h1 className="large text-primary">Users of ProHub</h1>
                    <p className="lead">
                        <i className="fas fa-user-circle"></i>Browse And connect
                    </p>
                    <div className="profiles">
                        {
                            profiles.length >0 ?(
                                profiles.map(profile =>(<ProfileItem key={profile._id} profile={profile}/>))):
                                    <h4>No Users Found...</h4>
                            
                        }
                    </div>
                </Fragment>
            }
        </Fragment>
    )
}

Profiles.propTypes = {
    getProfiles:PropTypes.func.isRequired,
    profile:PropTypes.object.isRequired,
}
const mapStateToprops=state=>({
    profile:state.profile
})
export default connect(mapStateToprops,{getProfiles})(Profiles)
