 export const adminmiddlewares = async (req ,res ,next )=>{

    try {
        console.log(req.user)
        const adminrole = req.user.isAdmin;
        if(!adminrole){
            return res
            .status(403)
            .json({message:"Access denide."})
        }
       // res.status(200).json({msg: req.user.isAdmin});
        next();
    } catch (error) {
        next(error);
    }
 } 