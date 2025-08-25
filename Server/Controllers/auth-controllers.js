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




export const addStudent = async (req, res) => {
  try {
    const {
      id,
      rollNo,
      firstName,
      middleName,
      lastName,
      experience,
      skills,
      education,
      description,
      activated,
    } = req.body;

    // Validate required fields
    if (!id || !rollNo || !firstName || !lastName) {
      return res.status(400).json({ message: "Required fields are missing" });
    }

    // Check duplicate roll number or id
    const existingUser = await User.findOne({ $or: [{ id }, { rollNo }] });
    if (existingUser) {
      return res.status(400).json({ message: "ID or Roll No already exists" });
    }

    // Create new student
    const newStudent = new User({
      id,
      rollNo,
      firstName,
      middleName,
      lastName,
      experience,
      skills,
      education,
      description,
      activated,
      username: `${firstName} ${lastName}`, // just mapping
      phone: "0000000000", // dummy (since schema requires it)
      password: "defaultPass123", // dummy password (you can improve later)
    });

    await newStudent.save();

    res.status(201).json({
      message: "Student added successfully",
      student: newStudent,
    });
  } catch (error) {
    console.error("Error adding student:", error);
    res.status(500).json({ message: "Server error" });
  }
};