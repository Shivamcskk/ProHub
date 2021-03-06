import React,{Fragment, useEffect} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux';
import {deleteAccount, getCurrentProfile} from '../../actions/profile';
import Spinner from '../layout/Spinner'
import { Link } from 'react-router-dom';
import DashboardAction from './DashboardAction'
import Experience from './Experience';
import Education from './Education';
const Dashboard = ({getCurrentProfile,auth:{user},profile:{profile,loading},deleteAccount}) => {
    useEffect(
        ()=>{
            getCurrentProfile();
        },[]
    )

    return (
        loading && profile===null ? <Spinner/> :<Fragment>
            <h1 className="large text-success" style={{fontWeight:"lighter"}}>Dashboard</h1>
            <p className="lead">
                <i className="fas fa-user"></i><span >Welcome,</span> <span style={{color:"#1a4654"}}>{user && user.name}</span>
            </p>
            {profile !==null ? <Fragment>
                <DashboardAction id={user._id}/>
                
                <Experience experience={profile.experience}/>
                <Education education={profile.education}/>
                <div className="my-2">
                    <button className="btn btn-danger" onClick={()=>deleteAccount()}>
                        <i className="fas fa-user-minus">Delete Account</i>
                    </button>
                </div>

            </Fragment> :<Fragment><p>No profile found,Please add details</p><Link to='/create-profile' className="btn btn-primary my-1">Create profile</Link></Fragment>}

        </Fragment>
    )
}

Dashboard.propTypes = {
    getCurrentProfile:PropTypes.func.isRequired,
    auth:PropTypes.object.isRequired,
    profile:PropTypes.object.isRequired,
}
const mapStateToProps=state=>({
    auth:state.auth,
    profile:state.profile
})

export default connect(mapStateToProps,{getCurrentProfile,deleteAccount})(Dashboard);

