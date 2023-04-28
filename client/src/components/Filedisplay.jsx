import axios from 'axios';
import React,{useState} from 'react'
import { useEffect,useContext } from 'react';
import {useParams} from 'react-router-dom'
import { Appcontext } from '../App';
import '../css/Filedisplay.css'
const Filedisplay = () => {
    let {cookies}=useContext(Appcontext);
    let {reponame,filename,extension}=useParams();
    let [content,setcontent]=useState('');
  useEffect(()=>
  {
let getfilecontent=async()=>
{
    filename=filename+'.'+extension;
    let {data:fetchdata}=await axios.post('http://localhost:5000/getfile',{reponame,filename,token:cookies.token});
  if(fetchdata['status']=='success')
  {
    setcontent(fetchdata['data']);
  }
    
}
getfilecontent();
  },[])
  
  return <>
 <div className='filecontent'>
  <div class="card border-danger mb-3" style={{"max-width": "20rem;"}}>
  <div class="card-header">{reponame}</div>
  <div class="card-body">
    <h4 class="card-title">{filename}</h4>
    <br></br>
    <br></br>
    <p class="card-text">{content}</p>
  </div>
</div>
</div>
  </>
}

export default Filedisplay