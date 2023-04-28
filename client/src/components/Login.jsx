import React,{useContext,useState} from 'react'
import {Appcontext} from '../App'
import {Form, useNavigate} from 'react-router-dom'
import { useEffect } from 'react';
import axios from 'axios'
import {TextField,Button,FormControl} from '@mui/material'
import '../css/Login.css'

import Message from './Message';

const Login = () => {
  let {state,dispatch,setcookie}=useContext(Appcontext);
  let [error,seterror]=useState({
    error:false,
    message:''
  })
  let navigate=useNavigate();
  useEffect(()=>
  {
   // console.log(state.login,' loggin naew');
    if(state.login==true)
    {
    //  console.log("logged in")
navigate('/')
    }
  },[state.login]);
  let login=async (e)=>
  {
    
    e.preventDefault();
    let formdata = new FormData(e.currentTarget);
   let  {username,password}= Object.fromEntries(formdata);
    let {data : fetchdata}=await axios.post('http://localhost:5000/login',{username,password},{withCredentials:true});
 // console.log(fetchdata)
    if(fetchdata['status']=='success')
    {
seterror(false);    
dispatch({type:'login',payload:{username,token:fetchdata['token'],setcookie}});
navigate('/');  
    }
    else{
      if(fetchdata['message'])
      {
        seterror({...error,error:true,message:fetchdata['message']});
      }
   //   console.log(fetchdata['message']);
    }

  }


  return <>
 
  <form className='loginform' onSubmit={login}>
  <h1>LOGIN FORM</h1>
     {/* <input  name='username' placeholder='username' />
   
       <input  name="password" placeholder='password' />
   */}
   
    {/* <input type="text" name="username" placeholder='username' />
    <input type="text" name="password" placeholder='password' /> */}
   
  <div class="form-group">
      <label for="exampleInputEmail1" class="form-label mt-4">Username</label>
      <input type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="username" name="username"/>
      <small id="emailHelp" class="form-text text-muted">username must be more than 5 characters</small>
    </div>
    <div class="form-group">
      <label for="exampleInputPassword1" class="form-label mt-4">Password</label>
      <input type="password" class="form-control" id="exampleInputPassword1" placeholder="Password" name="password"/>
    </div>
    <button  class="btn btn-outline-danger">Login</button>
  </form>
  {error.error && <Message message={error.message} />}
  </>
}

export default Login