import {useEffect,useContext} from 'react'
import  {Appcontext} from '../App'
import {useNavigate} from 'react-router-dom'
import '../css/Home.css'
const Home = () => {
let {state,dispatch,removecookie}=useContext(Appcontext);
let navigate=useNavigate();
useEffect(()=>
{
if(state.login==false)
{
navigate('/login');
}
},[state.login])

let gotonewrepo=()=>
{
  navigate('/newrepo');
}
let gotobrowse=()=>
{
  navigate('/browse');
}
return <>
 
  


 <div className='homebuttonclass'>
 <button type="button" class="btn btn-outline-secondary btn-lg" onClick={gotobrowse} >BROWSE</button>
 <button type="button" class="btn btn-outline-info btn-lg" onClick={gotonewrepo} >NEW REPO</button>
 </div>

  </>
}

export default Home