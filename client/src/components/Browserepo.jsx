import axios from 'axios'
import React from 'react'
import  { Appcontext } from '../App'
import { useEffect,useContext,useState } from 'react'
import {Link} from 'react-router-dom'
import '../css/Browserepo.css'


const Browserepo = () => {
    let {state,cookies,dispatch}=useContext(Appcontext)
    let [allrepos,setallrepos]=useState([]);
    let randcolors=['warning','info','danger','success'];
useEffect(()=>
{
   let allrepos=async ()=>
   {
    let {data:fetchdata}=await axios.post('http://localhost:5000/allrepos',{token:cookies.token});
    if(fetchdata['status']=='success')
    {
        setallrepos(fetchdata['data']);
    }else{
       // console.log(fetchdata['message']);
    }
   }
   allrepos();
},[])

  return <>
  <div className='browserepo'>
  {allrepos.map((repo)=>
  {
    return <>
    <div class={`alert alert-dismissible alert-${randcolors[Math.floor(Math.random() * 11)%randcolors.length]}`}>

  <a href="#" class="alert-link"><strong><Link to={`/browse/${repo}`}>{repo}</Link></strong></a>
</div>
    
    </>
  })}
  </div>
  </>
}

export default Browserepo