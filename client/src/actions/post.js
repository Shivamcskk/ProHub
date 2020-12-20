import axios from 'axios';
import {setAlert} from './alert';
import { ADD_POST, DELETE_POST, GET_POSTS, POST_ERROR, UPDATE_LIKE } from './types';

export const getPosts=()=>async dispatch =>{
    try {
        const res=await axios.get('/api/posts');
        dispatch({
            type:GET_POSTS,
            payload:res.data
        })

    } catch (err) {
        dispatch({
            type:POST_ERROR,
            payload:{msg:err.response.statusText,status:err.response.status}
        })
    }
}
export const addLike=postId=>async dispatch =>{
    try {
        const res=await axios.put(`api/posts/like/${postId}`);
        dispatch({
            type:UPDATE_LIKE,
            payload:{postId,likes:res.data}
        })

    } catch (err) {
        dispatch({
            type:POST_ERROR,
            payload:{msg:err.response.statusText,status:err.response.status}
        })
    }
}
export const removeLike=postId=>async dispatch =>{
    try {
        const res=await axios.put(`api/posts/unlike/${postId}`);
        dispatch({
            type:UPDATE_LIKE,
            payload:{postId,likes:res.data}
        })

    } catch (err) {
        dispatch({
            type:POST_ERROR,
            payload:{msg:err.response.statusText,status:err.response.status}
        })
    }
}
export const deletePost=postId=>async dispatch =>{
    try {
        const res=await axios.delete(`api/posts/${postId}`);
        dispatch({
            type:DELETE_POST,
            payload:postId
        });
        dispatch(setAlert('Post Removed','success'))

    } catch (err) {
        dispatch({
            type:POST_ERROR,
            payload:{msg:err.response.statusText,status:err.response.status}
        })
    }
}
export const addPost=FormData=>async dispatch =>{
    const config={
        headers:{
            'Content-type':'application/json'
        }
    }
    try {
        const res=await axios.post('api/posts',FormData,config);
        dispatch({
            type:ADD_POST,
            payload:res.data
        });
        dispatch(setAlert('Post Created','success'))

    } catch (err) {
        dispatch({
            type:POST_ERROR,
            payload:{msg:err.response.statusText,status:err.response.status}
        })
    }
}