import User from '../Model/user-model.js';
import bcrypt from 'bcrypt'


export const home = async (req,res)=>{
    try {
        res.send("hello world");
    } catch (error) {
        console.error(error)
    }
   
};







export const register = async (req ,res ) => {
    try {
        const { username , email , phone , password} = req.body;
        const userexits = await User.findOne({email:email});
        if (userexits){
           return res.status(400).json({message:"Email alerdy exits"})
        }
        else{

            const saltround = 10;
            const hash_password = await bcrypt.hash(password,saltround);

         const usercreated = await User.create({username , email , phone , password:hash_password});

         res.status(200).json({message:"Registration Successfully", token : await usercreated.generateToken(), userId :usercreated._id.toString()});
        }
        
    } catch (error) {
        res.status(500).json("internal server error")
    }
}



export const login = async (req , res) => {
 const { email , password } = req.body;
 const userexits = await User.findOne({email});

 if(!userexits){
    return res.status(400).json({message:"Invalid Credentials"})
 }
 
 const user = await bcrypt.compare(password ,userexits.password)

 if(user){
    res.status(200).json({msg:"Login Successfully", token : await userexits.generateToken(), userId :userexits._id.toString()});
       
 }
 else{
    res.status(401).json({message:"Invalid email or Password"})
 }
  
}


export const user = async (req , res) =>{
    try {
        const userdata = req.user;
        console.log(userdata);
        return res.status(200).json({ userdata})

        
    } catch (error) {
        res.status(500).json("internal server error")
    }
}