import { useEffect,useContext } from "react"
import {useNavigate} from 'react-router-dom'
import {Appcontext} from '../App'
import axios from 'axios'
import Message from "./Message"
import { useState } from "react"
import '../css/Sign.css'
const Sign = () => {

    let {state,dispatch}=useContext(Appcontext);
    let [error,seterror]=useState({
        error:false,message:''
    })
let navigate=useNavigate();
  useEffect(()=>
  {
      if(state.login==true)
      {
         navigate('/')
      }
      

      

  },[state.login])
  let signup=async(e)=>
  {
    e.preventDefault();
    let formData = new FormData(e.currentTarget);
    let {username,email,password} = Object.fromEntries(formData);
    let {data : fetchresult}=   await axios.post('http://localhost:5000/signup',{username,email,password});
if(fetchresult['status']=='failed')
{
   seterror({...error,error:true,message:fetchresult['message']})
}
else{
 //   console.log("signed in");
   navigate('/login');
}
  }
  return <>
 
 <form onSubmit={signup} className="signform">
  
    <h1>SIGN FORM</h1>
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
      <label for="exampleInputEmail1" class="form-label mt-4">Email</label>
      <input type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="email" name="email"/>
      <small id="emailHelp" class="form-text text-muted">enter valid email</small>
    </div>
    <div class="form-group">
      <label for="exampleInputPassword1" class="form-label mt-4">Password</label>
      <input type="password" class="form-control" id="exampleInputPassword1" placeholder="Password" name="password"/>
    </div>
    <button  class="btn btn-outline-danger">Signup</button>
 
 </form>
 {error.error && <Message message={error.message}/>}
 
 </>
}

export default Sign