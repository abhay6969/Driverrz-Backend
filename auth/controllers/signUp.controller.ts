import { User } from "../../models/user";

export const SignUpUser = async(req:any,res:any) =>{
    try{
        const user = req.body;
        if(!user.name || !user.email || !user.password){
            return res.status(400).json({message:"Please fill all the fields"});
        }
        const existingUser = await User.findOne({email:user.email});
        if(existingUser){
            return res.status(400).json({message:"User already exists"});
        }
        const newUser = new User(user);
        await newUser.save();
        return res.status(201).json({message:"User created successfully"});
    }catch(error){
        return res.status(500).json({message:"Something went wrong"});
    }
}