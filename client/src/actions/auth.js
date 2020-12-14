import axios from 'axios';
import {setAlert, SetAlert} from './alert';
import {REGISTER_FAIL,REGISTER_SUCCESS} from './types';
export const register =({name,email,password})=>async dispatch =>{
    const config ={
        headers:{
            'content-Type':'application/json'
        }
    }

    const body=JSON.stringify({name,email,password});

    try {
    const res=await axios.post('/api/users',body,config);
    dispatch({
        type:REGISTER_SUCCESS,
        payload:res.data
    });    
    
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