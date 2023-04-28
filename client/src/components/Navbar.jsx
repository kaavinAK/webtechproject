import React,{useContext} from 'react'
import { Appcontext } from '../App'
import {useNavigate} from 'react-router-dom'
import {Link} from 'react-router-dom'
const Navbar = () => {
    let {cookies,state,removecookie,dispatch}=useContext(Appcontext);
    let sample=useContext(Appcontext);
    let navigate=useNavigate();
  //  console.log("nav bar ",cookies,state,sample);
    let logout=()=>
{
   // console.log("logout man")
  dispatch({type:'logout',payload:{removecookie}});
navigate('/');
}
   // console.log(state)
  return <>
  {cookies.token?
  <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
  <div className="container-fluid">
    <a className="navbar-brand" >{state.username}</a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarColor01" aria-controls="navbarColor01" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarColor01">
      <ul class="navbar-nav me-auto">
        <li class="nav-item">
          <a class="nav-link active"><Link to='/'>Home</Link>
            <span class="visually-hidden">(current)</span>
          </a>
        </li>
        <li class="nav-item">
          <a class="nav-link" ><Link to='/browse'>Repos</Link></a>
        </li>
        <li class="nav-item">
          <a class="nav-link" ><Link to='/newrepo'>NewRepo</Link></a>
        </li>
        <li class="nav-item">
          <a class="nav-link" onClick={logout} >Logout</a>
        </li>
       
      </ul>
      
    </div>
  </div>
</nav>:<nav class="navbar navbar-expand-lg navbar-dark bg-primary">
  <div class="container-fluid">
    <a class="navbar-brand" >User</a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarColor01" aria-controls="navbarColor01" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarColor01">
      <ul class="navbar-nav me-auto">
        <li class="nav-item">
          <a class="nav-link active"><Link to='/login'>Login</Link>
            <span class="visually-hidden">(current)</span>
          </a>
        </li>
        <li class="nav-item">
          <a class="nav-link" ><Link to='/sign'>Signup</Link></a>
        </li>
        
        
       
      </ul>
      
    </div>
  </div>
</nav>}
  </>
}

export default Navbar