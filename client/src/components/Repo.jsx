import axios from 'axios';
import React from 'react'
import { Appcontext } from '../App';
import { useEffect,useContext,useRef } from 'react';
import {useParams,useNavigate} from 'react-router-dom'
import { useState } from 'react';
import Repoelement from './Repoelement';
import '../css/Repo.css'
import * as lod from 'lodash'
const Repo = () => {
    let {reponame}=useParams();
    let multiplefileref=useRef();
   // let [files,setfiles]=useState([])
    let navigate=useNavigate();
    let [allfiles,setallfiles]=useState([]);
    let [oldfiles,setoldfiles]=useState([]);
    let {cookies}=useContext(Appcontext)
    let [disable,setdisable]=useState(false);
    useEffect(()=>
    {
          let getallfiles=async()=>
          {
               let {data : fetchdata}=await axios.post('http://localhost:5000/files',{token:cookies.token,reponame:reponame});
               if(fetchdata['status']=='success')
               {
                setallfiles([...fetchdata['data']]);
                setoldfiles([...fetchdata['data']]);
               }
               else{
                if(fetchdata['message']=='no repo')
                {
navigate('/');
                }
               }
          } 
      
          getallfiles();
    },[])
    let changefile=()=>
    {
     

      let names=[];
      for(let i=0;i<multiplefileref.current.files.length;i++)
      {
         names.push(multiplefileref.current.files[i].name);
      }
    

      names=new Set(names);
      names=[...names];
let newfiles=[...allfiles,...names];
newfiles=new Set(newfiles)
// console.log("equal arrays ",newfiles,oldfiles)
    
//      if(lod.isEqual(newfiles,oldfiles))
//      {
// setdisable(true)
//      }
//      else{
//       if(newfiles.length>=oldfiles.length)
//       {
//         setdisable(false)

//       }
//      }
      setallfiles([...newfiles]);
//       setoldfiles([...newfiles]);
    }
    let remove=(index)=>
    {
      if(multiplefileref.current.files.length>1)
      {
        allfiles.forEach((file,i)=>
        {
          if(i==index)
          {
            multiplefileref.current.files.forEach((onefile,i1)=>
            {
              if(onefile.name==file.name)
              {
                multiplefileref.current.files[i1].name='';
              }
            })
          }
        })
      }
     
      let updatedfiles=allfiles.filter((file,i)=>
      {
if(i!=index)
{
  return file;
}
      })
      setallfiles([...updatedfiles]);
    }
    let updatefiles=async()=>
    {
   let {data : fetchdata}=await axios.post('http://localhost:5000/updatefiles',{token:cookies.token,filenames:allfiles,reponame});
 // console.log(fetchdata['message']);
  }
    let submit=async (e)=>
    {
e.preventDefault();
//console.log(multiplefileref.current.files)
let formData = new FormData()
      //formData.append('token',cookies.token);
      //formData
      formData.append('token',cookies.token);
    //  console.log("repoman  ",reponame);
      formData.append('reponame',reponame);
      formData.append('allfiles',JSON.stringify(allfiles));
   //  console.log("allfiles  ",allfiles);
      for(let i=0;i<multiplefileref.current.files.length;i++)
      {
      //  console.log(multiplefileref.current.files
    //  console.log(allfiles);
     
        if(multiplefileref.current.files.name!='')
        {
          formData.append('files',multiplefileref.current.files[i],multiplefileref.current.files.name);
    
        }
      
      
      }
    


    //  console.log("dorm data ",formData)
      //http://localhost:5000/uploadfiles
    
      let {data : fetchdata}=await axios.post('http://localhost:5000/uploadfiles',formData,{
        headers:{
          'Content-Type':'multipart/form-data'
        }
      })
  //    console.log('fethc data ',fetchdata);

    }
    
  return <>
  
  <div className='files'>
{allfiles.map((files,index)=>
{
    return <>
    <Repoelement reponame={reponame} files={files} index={index} remove={remove}/>
    </>
})}
<div className='formmodel'>
<form onSubmit={submit} encType='multipart/form-data'>
    <input ref={multiplefileref} onChange={changefile}  type='file' multiple="multiple" accept='application/txt' id="multiplefile" name="files"/>
 
   {disable? <button  class="btn btn-secondary" disabled>Upload</button>:<button  class="btn btn-secondary">Upload</button>}
</form>
</div>
</div>





  </>
}

export default Repo