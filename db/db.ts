import mongoose from "mongoose";

export const connectDB = async()=>{
    try{
        const con = await mongoose.connect(process.env.MONGO_URI!,{
            dbName:"chalo-crm"
        });
        if(con) console.log("Connected to DB");
    }catch(error:any){
        throw new Error(error);
    }
}