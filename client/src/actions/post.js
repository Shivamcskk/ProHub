import axios from 'axios';
import {setAlert} from './alert';
import { ADD_POST, DELETE_POST, GET_POSTS,GET_POST, POST_ERROR, UPDATE_LIKE, ADD_COMMENT, REMOVE_COMMENT } from './types';

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
export const getPost=(id)=>async dispatch =>{
    try {
        const res=await axios.get(`/api/posts/${id}`);
        dispatch({
            type:GET_POST,
            payload:res.data
        })

    } catch (err) {
        dispatch({
            type:POST_ERROR,
            payload:{msg:err.response.statusText,status:err.response.status}
        })
    }
}
export const addComment=(postId,FormData)=>async dispatch =>{
    const config={
        headers:{
            'Content-type':'application/json'
        }
    }
    try {
        const res=await axios.post(`/api/posts/comment/${postId}`,FormData,config);
        dispatch({
            type:ADD_COMMENT,
            payload:res.data
        });
        dispatch(setAlert('Comment Added','success'))

    } catch (err) {
        dispatch({
            type:POST_ERROR,
            payload:{msg:err.response.statusText,status:err.response.status}
        })
    }
}
export const deleteComment=(postId,commentId)=>async dispatch =>{
    
    try {
        const res=await axios.delete(`/api/posts/comment/${postId}/${commentId}`);
        dispatch({
            type:REMOVE_COMMENT,
            payload:commentId
        });
        dispatch(setAlert('Comment Removed','success'))

    } catch (err) {
        dispatch({
            type:POST_ERROR,
            payload:{msg:err.response.statusText,status:err.response.status}
        })
    }
}