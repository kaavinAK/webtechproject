import React from 'react'
import {useNavigate,Link} from 'react-router-dom'

const Repoelement = ({index,files,remove,reponame}) => {
  let filename=files.split('.')[0];
  let extension=files.split('.')[1];
  let randcolors=['warning','info','danger','success'];
    return <>
     <div class={`alert alert-dismissible alert-${randcolors[Math.floor(Math.random() * 11)%randcolors.length]}`}>
     <button type="button" onClick={()=>{remove(index)}} class="btn-close" data-bs-dismiss="alert"></button>
<a href="#" class="alert-link"><strong>  <Link to={`/browse/${reponame}/${extension}/${filename}`}>{files}</Link></strong></a>
</div>
  
   
  
  </>
}

export default Repoelement