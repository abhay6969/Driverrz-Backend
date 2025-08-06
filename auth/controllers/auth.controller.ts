import { User } from "../../models/user";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import Driver from "../../models/driver";

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
        const pass = bcrypt.hashSync(user.password,10);
        user.password = pass;
        const newUser = new User(user);
        await newUser.save();
        return res.status(200).json({message:"User created successfully"});
    }catch(error){
        return res.status(500).json({message:"Something went wrong"});
    }
}

const generateAuthToken = (user:any) =>{
    return jwt.sign({id:user.id,email:user.email},process.env.JWT_SECRET!,{
        expiresIn:"15m"
    });
}

const generateRefreshToken = (user:any)=>{
    const refreshToken = jwt.sign({id:user.id,email:user.email},process.env.JWT_SECRET!,{
        expiresIn:"7d"
    });
    console.log(refreshToken)
    user.refreshToken = refreshToken;
    user.save();
    return refreshToken;
}

export const SignInUser = async(req:any,res:any) =>{
    try{
        const user = req.body.data;
        // console.log(user);
        if(!user.email || !user.password){
            return res.status(400).json({message:"Please fill all the fields"});
        }
        const existingUser = await User.findOne({email:user.email});
        // console.log(existingUser);
        if(!existingUser || !bcrypt.compareSync(user.password,existingUser.password)){
            return res.status(400).json({message:"Invalid credentials"});
        }
        const token = generateAuthToken(existingUser);
        // console.log(token)
        const refreshToken = generateRefreshToken(existingUser);
        console.log(refreshToken)
        res.cookie('refreshToken',refreshToken,{
            httpOnly:true,
            sameSite:'strict',
            path:'/api/auth/refresh',
            maxAge:7*24*60*60*1000
        })
        return res.status(200).json({message:"User logged in successfully",token});
    }catch(error){
        return res.status(500).json({message:"Something went wrong"});
    }
}

export const SignUpDriver = async(req:any,res:any) =>{
    try{
        const user = req.body;
        console.log(user)
        if(!user.name || !user.email || !user.password){
            return res.status(400).json({message:"Please fill all the fields"});
        }
        const existingUser = await Driver.findOne({email:user.email});
        if(existingUser){
            return res.status(400).json({message:"User already exists"});
        }
        const pass = bcrypt.hashSync(user.password,10);
        user.password = pass;
        const newUser = new Driver(user);
        await newUser.save();
        return res.status(200).json({message:"User created successfully"});
    }catch(error){
        console.log(error)
        return res.status(500).json({message:"Something went wrong"});
    }
}

export const SignInDriver = async(req:any,res:any) =>{
    try{
        const user = req.body.data;
        console.log(user);
        if(!user.email || !user.password){
            return res.status(400).json({message:"Please fill all the fields"});
        }
        const existingUser = await Driver.findOne({email:user.email});
        console.log(existingUser);
        if(!existingUser || !bcrypt.compareSync(user.password,existingUser.password)){
            return res.status(400).json({message:"Invalid credentials"});
        }
        const token = generateAuthToken(existingUser);
        console.log(token)
        const refreshToken = generateRefreshToken(existingUser);
        console.log(refreshToken)
        res.cookie('refreshToken',refreshToken,{
            httpOnly:true,
            sameSite:'strict',
            path:'/api/refresh',
            maxAge:7*24*60*60*1000
        })
        return res.status(200).json({message:"User logged in successfully",token});
    }catch(error){
        return res.status(500).json({message:"Something went wrong"});
    }
}

export const refreshAccessToken = (req: any, res: any) => {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) return res.sendStatus(401);

    jwt.verify(refreshToken, process.env.JWT_SECRET!, (err: any, user: any) => {
        if (err) return res.sendStatus(403);

        const newAccessToken = generateAuthToken(user);
        res.status(200).json({ token: newAccessToken });
    });
};
