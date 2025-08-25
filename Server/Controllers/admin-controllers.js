import Contact from '../Model/contact-model.js';
import User from '../Model/user-model.js';

export const getAllUsers = async (req, res) => {
    try {
        const users = await User.find({}, { password: 0 });
        console.log(users);
        if (!users || users.length === 0) {
          return  res.status(404).json({ message: "NO Users Found" });
        } else {
         return  res.status(200).json(users);
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

export const getAllContacts = async (req, res) => {
    try {
        const contacts = await Contact.find();
        console.log(contacts);
        if (!contacts || contacts.length === 0) {
          return  res.status(404).json({ message: "NO Contacts Found" });
        } else {
         return  res.status(200).json(contacts);
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

export const deleteContactById = async (req, res) => {
    try {
      const id = req.params.id;
      await Contact.deleteOne({ _id: id });
      return res.status(200).json({ message: "Contact Deleted Successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  };

export const deleteUserById = async(req,res)=>{
    try {
        const id = req.params.id;
        await User.deleteOne({ _id: id });
        return res.status(200).json({message:"User Deleted Successfully"});
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}



export const getUserById = async(req,res)=>{
    try {
        const id = req.params.id;
        const data= await User.findOne({_id:id},{password:0});
        return res.status(200).json(data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

// export const updateUserById = async (req,res)=>{
//     try {
//         const id = req.params.id;
//         const updateuserdata = req.body;
//         const updateduser = await User.updateOne({_id:id},{$set:updateuserdata,})

//         return res.status(200).json(updateduser);
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ message: "Internal Server Error" });
        
//     }
// }

export const updateUserById = async (req, res) => {
    try {
      const id = req.params.id;
      const updateUserData = req.body;
  
      // Find the user by ID
      const user = await User.findById(id);
  
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
  
      // Update the user data
      user.username = updateUserData.username;
      user.email = updateUserData.email;
      user.phone = updateUserData.phone;
  
      // Save the updated user
      await user.save();
  
      return res.status(200).json({ message: "User updated successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  };