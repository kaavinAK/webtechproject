let express= require('express')
let app  = express();
let mongodb=require('mongodb');
let loadash = require('lodash');
let mongoose=require('mongoose');
let cookieparser=require('cookie-parser');
let jwt=require('jsonwebtoken');
let {signupschema,loginschema}=require('./Joischema/User');
let {secrettoken}=require('./constants')
let cors=require('cors');
let bodyparser=require('body-parser');
let fs=require('fs');
let fileupload=require('express-fileupload');
//let upload=multer({dest:'./data/'})
let {User,Repo}=require('./Schema/User');
mongoose.connect('mongodb+srv://kaaivn:gak5679v@tutorial.1omiw.mongodb.net/webtechproject?retryWrites=true&w=majority').then(()=>
{
    app.listen(5000,()=>
    {
        console.log("server started ");
    })
})

app.use(express.json());
//app.use(bodyparser.urlencoded({extended:true}))
app.use(express.urlencoded());
app.use(cors({
    origin:'http://127.0.0.1:5173',
    credentials:true
}))
app.use(cookieparser());
app.use(fileupload());
if(fs.existsSync('./data'))
{

}
else
{
    fs.mkdirSync('./data');

}
app.post('/signup',async(req,res)=>
{
    let {username,password,email}=req.body;

    try
    {
        await   signupschema.validateAsync(req.body);
    }
    catch(err)
    {
        let messages=err['details'].map((obj)=>
        {
            return obj['message'];
        })
     
return res.json({status:"failed",message:messages})
    }


   if(await User.findOne({username,password}))
   {
return res.json({status:"failed",message:"user exists"});
   }

   else{
    let newuser=new User({username,password,email});
    
    await newuser.save();
     
    return res.json({'status':"successs",'id':newuser.id,message:"user created"});

   }

 
})
app.post('/login',async (req,res)=>
{
    let {username,password}=req.body;
    try{
        await loginschema.validateAsync({username,password});
    }
    catch(err)
    {
        let messages=err['details'].map((obj)=>
        {
            return obj['message'];
        })
     
return res.json({status:"failed",message:messages})
    }
    let user=await User.findOne({username,password})
    if(user)
    {
        let cookietoken=jwt.sign({user:user['id']},secrettoken);
      //  res.cookie('token',cookietoken);
        return res.json({status:"success",message:"logged in",token:cookietoken});
    }
    else{
return res.json({status:"failed",message:"wrong credentials"})
    }
    

})
app.use(async (req,res,next)=>
{
   
    if(req.body.token)
    {
        let token=jwt.verify(req.body['token'],secrettoken);
        let user= await User.findById(token['user']);
        req.user=user;
        next();
    }
    else{

            return res.json({'status':'failed',message:"not logged in"});
              
    }
})
app.post('/logcheck',(req,res)=>
{
    if(req.user)
    {
 let {username}=req.user;       
return res.json({status:"success",data:{username}});
    }
    else{

return res.json({status:"failed"});
    }
})
app.post('/newrepo',async (req,res)=>
{
    if(req.user)
    {
        let {reponame}=req.body;
        
         
         for(let i=0;i<req.user.repos.length;i++)
         {
            if(req.user.repos[i].reponame==reponame)
            {
                return res.json({status:"failed",message:"repo exists"});
            }
         }
         let newrepo = new Repo({
            reponame:reponame
         }) ;
         await newrepo.save();
        req.user.repos.push(newrepo);
         await req.user.save();
         if(fs.existsSync(`./data/${req.user.id}`))
         {

         }
         else{
            fs.mkdirSync(`./data/${req.user.id}`);
         }
         fs.mkdirSync(`./data/${req.user.id}/${reponame}`);
         return res.json({status:"success",message:'repo created'})


    }
    else
    {
        return res.json({status:"failed"})
    }
})

app.post('/allrepos',(req,res)=>
{
    if(req.user)
    {
        let reponames=req.user.repos.map((repo)=>
        {
            return repo.reponame;
        })
        return res.json({status:"success",data:reponames});
    }
})
app.post("/files",(req,res)=>
{
    if(req.user)
    {
        let temp=false;
        let allfiles=req.user.repos.filter((repo)=>
        {
            if(repo.reponame==req.body.reponame)
            {
                temp=true;
                return repo;
            }
        })
        if(!allfiles[0])
        {
return res.json({status:"failed",message:'no repo'})
        }
        allfiles=[...allfiles[0].files];
            return res.json({status:"success",data:allfiles})
 
        
    }
    else{
        return res.json({status:"failed",message:"not logged in"});
    }
})
app.post('/uploadfiles',async (req,res)=>
{
    if(req.user)
    {
        let error=false;
       let currentrepo=req.user.repos.filter((repo)=>
         {
            if(repo.reponame==req.body.reponame)
            {
                return repo;
            }
         })
        
    currentrepo[0].files=JSON.parse(req.body.allfiles);
    if(!req.files)
    {
        await req.user.save();
        return res.json({status:"success",message:"file uploaded"})
    }
      else if(!req.files.files.name)
      {
        
        req.files.files.forEach((file)=>
        {

             if(fs.existsSync(`./data/${req.user.id}/${req.body.reponame}/${file.name}`))
             {

             }
             else{
                try{
                    fs.writeFileSync(`./data/${req.user.id}/${req.body.reponame}/${file.name}`,file.data,'utf-8');
                }
                catch(err)
                {
                   error=true;
                }
             
             }
        })
    }else{
        let file=req.files.files;
        
             if(fs.existsSync(`./data/${req.user.id}/${req.body.reponame}/${file.name}`))
             {
                    
             }
             else{
                try{
                    fs.writeFileSync(`./data/${req.user.id}/${req.body.reponame}/${file.name}`,file.data,'utf-8');
                }
                catch(err)
                {
                   error=true;
                }
             
             }
       
    }
        
        if(error)

        {
return res.json({status:"failed",message:"file corrupted"});
        }
        else{
            await req.user.save();
            return res.json({status:"success",message:"uploaded"});
        }
       
    }
    else{
        return res.json({status:"failed",message:"not logged in"});
    }
})
app.post("/updatefiles",async (req,res)=>
{
   if(req.user)
   {
    let currentrepo=req.user.repos.filter((repo)=>
    {
       if(repo.reponame==req.body.reponame)
       {
           return repo;
       }
    })
    let updatedfiles=loadash.intersection(req.body.filenames,currentrepo[0].files);
    let deletingfiles=currentrepo[0].files.map((file)=>
    {
        if(updatedfiles.includes(file))
        {

        }
        else{
            return file;
        }
    })
    deletingfiles.map((file)=>
    {
        if(fs.existsSync(`./data/${req.user.id}/${req.body.reponame}/${file}`))
        {
            fs.rmSync(`./data/${req.user.id}/${req.body.reponame}/${file}`);
        }
    })
    currentrepo[0].files=updatedfiles;
    await req.user.save();
    return res.json({status:"success",message:"updated"});
   }
   else{
    return res.json({status:"failed",message:"not logged"});
   }
})
app.post('/getfile',async(req,res)=>
{
    if(req.user)
    {
       let {reponame,filename}=req.body;
       if(fs.existsSync(`./data/${req.user.id}/${reponame}/${filename}`))
       {
        try{
            let content=fs.readFileSync(`./data/${req.user.id}/${reponame}/${filename}`,{encoding:'utf-8'});
            return res.json({status:"success",data:content});
        }
        catch(err)
        {
        }
      
       } 
       else{
        return res.json({status:"failed",message:"no file"})
       }
    }
    else{
        return res.json({status:"failed",message:"not logged in"})
    }
})


