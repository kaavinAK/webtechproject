let mongoose=require('mongoose');

let Reposchema=new mongoose.Schema({
    reponame:String,
    files:[String]
},{timestamps:true});

let Userschema=new mongoose.Schema({
    username:String,
    password:String,
    email:String,
    repos:[Reposchema]

},{timestamps:true});
let User = mongoose.model('User',Userschema);
let Repo = mongoose.model('Repo',Reposchema);
module.exports ={User,Repo};
