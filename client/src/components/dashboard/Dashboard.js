import React,{Fragment, useEffect} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux';
import {getCurrentProfile} from '../../actions/profile';
import Spinner from '../layout/Spinner'
import { Link } from 'react-router-dom';
import DashboardAction from './DashboardAction'
const Dashboard = ({getCurrentProfile,auth:{user},profile:{profile,loading}}) => {
    useEffect(
        ()=>{
            getCurrentProfile();
        },[]
    )

    return (
        loading && profile===null ? <Spinner/> :<Fragment>
            <h1 className="large text-success">Dashboard</h1>
            <p className="lead">
                <i className="fas fa-user"></i>Welcome {user && user.name}
            </p>
            {profile !==null ? <Fragment><DashboardAction/></Fragment> :<Fragment><p>No profile found,Please add details</p><Link to='/create-profile' className="btn btn-primary my-1">Create profile</Link></Fragment>}

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

export default connect(mapStateToProps,{getCurrentProfile})(Dashboard);

