import React, { useState,useReducer,useContext,createContext } from 'react'
import {Route,Routes, redirect,useNavigate,useLocation} from 'react-router-dom'
import Sign from '../src/components/Sign';
import {useCookies} from 'react-cookie'
import  Login from '../src/components/Login';

import Home from '../src/components/Home'

import { useEffect } from 'react';
import axios from 'axios';
import Newrepo from './components/Newrepo';
import Browserepo from './components/Browserepo';
import Repo from './components/Repo';
import Filedisplay from './components/Filedisplay';
import Navbar from './components/Navbar';

export let Appcontext=createContext();
let defaultstate={
  login:false,
  username:'',
  token:''
}
let reducer=(state,action)=>
{
   if(action.type=='login')
   {
    action.payload.setcookie('token',action.payload.token,{path:'/'});
    return {...state,login:true,username:action.payload.username}
   }
  
   else if(action.type=='logout')
   {
    action.payload.removecookie('token',{path:'/'});
 
    return {...state,login:false,username:''};
   }
}
function App() {
  let [cookies,setcookie,removecookie]=useCookies(['token'])
  let location=useLocation();
  let [state,dispatch]=useReducer(reducer,defaultstate);
  let navigate=useNavigate()
  useEffect(()=>
  {
    let checklogin=async()=>
    {
     // console.log("check login")
   if(cookies.token)
   {
      let {data:fetchdata}=await axios.post('http://localhost:5000/logcheck',{token:cookies.token},{withCredentials:true});
   //  console.log(fetchdata);
      dispatch({type:'login',payload:{username:fetchdata['data']['username'],setcookie,token:cookies.token}});
   }
   else{
     if(location.pathname!='/sign')
     {
    //  console.log("login")
      navigate('/login')

     }
   }
    }
    checklogin();
   // console.log(location.pathname)
  },[])
  
  return (
   <>
   <Appcontext.Provider value={{state,dispatch,setcookie,removecookie,cookies}}>
   <Navbar/>
   <Routes>
   
    <Route exact path='/sign'  element={<Sign/>}/>
      
      <Route exact  path='/login' element={<Login/>}/>
            

      <Route exact path='' element={<Home/>}/>
       <Route exact path='/newrepo' element={<Newrepo/>}  />
       <Route exact path='/browse' element={<Browserepo/>} />
       <Route exact path='/browse/:reponame' element={<Repo/>}/>
   <Route exact  path='browse/:reponame/:extension/:filename' element={<Filedisplay/>}/>
   </Routes>
   </Appcontext.Provider>
   </>
  )
}

export default App
