import mongoose from "mongoose";

const driverSchema = new mongoose.Schema({
    name:{type:String},
    email:{type:String},
    password:{type:String},
    refreshToken:{type:String},
    carNo:{type:String},
    carType:{type:String,enum:["hatchback","sedan","suv"]},
    adharNo:{type:String},
    drivingExperience:{type:Number},
},{
    timestamps:true
})

const Driver = mongoose.models.Driver || mongoose.model("Driver",driverSchema);
export default Driver