import Axios from 'axios';
import {setAlert, SetAlert} from './alert';
import {REGISTER_FAIL,REGISTER_SUCCESS,USER_LOADED,AUTH_ERROR,LOGIN_SUCCESS,LOGIN_FAIL,LOGOUT} from '../actions/types';
import setAuthToken from '../utils/setAuthToken'

export const loaduser=()=>async dispatch=>{
    if(localStorage.token)
    {
        setAuthToken(localStorage.token);
    }
    try {
      
        const res=await Axios.get('/api/auth');
        
        dispatch({
            type:USER_LOADED,
            payload:res.data
        });

    } catch (err) {
        console.log(err.message)
        dispatch({
            type:AUTH_ERROR
        })
    }
}

export const register =({name,email,password})=>async dispatch =>{
    const config ={
        headers:{
            'content-Type':'application/json'
        }
    }

    const body=JSON.stringify({name,email,password});

    try {
    const res=await Axios.post('/api/users',body,config);
    dispatch({
        type:REGISTER_SUCCESS,
        payload:res.data
    });    
    dispatch(loaduser());
    } catch (err) {
        const errors =err.response.data.errors;
        if(errors){
            errors.forEach(error => {
                dispatch(setAlert(error.msg,'danger'));
            });
        }
        dispatch({
            type:REGISTER_FAIL
        })
    }
}
export const login =({email,password})=>async dispatch =>{
    const config ={
        headers:{
            'content-Type':'application/json'
        }
    }

    const body=JSON.stringify({email,password});

    try {
       
    const res=await Axios.post('/api/auth',body,config);
    dispatch({
        type:LOGIN_SUCCESS,
        payload:res.data
    });    
    dispatch(loaduser());
    } catch (err) {
        const errors =err.response.data.errors;
        if(errors){
            errors.forEach(error => {
                dispatch(setAlert(error.msg,'danger'));
            });
        }
        dispatch({
            type:LOGIN_FAIL
        })
    }
}
export const logout=()=> dispatch=>{
    dispatch({type:LOGOUT})
}