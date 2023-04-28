import {useContext} from 'react' 
import {useNavigate} from 'react-router-dom'
import App, {Appcontext} from '../App'
import axios from 'axios';
import '../css/Newrepo.css'

const Newrepo = () => {
    let {state,cookies,dispatch}=useContext(Appcontext);
let navigate= useNavigate();

    let submitrepo=async(e)=>
    {
e.preventDefault();
let formdata = new FormData(e.currentTarget);
let {reponame}=Object.fromEntries(formdata);
let {data : fetchdata}=await axios.post('http://localhost:5000/newrepo',{token:cookies.token,reponame});
//console.log(fetchdata);
if(fetchdata['status']=='success')
{
    navigate('/');
}
else{
  //  console.log(fetchdata['message']);
}
    }
  return <>
<form onSubmit={submitrepo} className='repoform'>
<div class="form-group">
      <label for="exampleInputEmail1" class="form-label mt-4">Reponame</label>
      <input type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" name="reponame" placeholder="Reponame"/>
      <small id="emailHelp" class="form-text text-muted">name for new repo</small><br></br>
      <button  class="btn btn-outline-danger">Create Newrepo</button>

    </div>

</form> 
  
  </>
}

export default Newrepo