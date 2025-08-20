import { User } from "../model/userSchema.js";
import bcrypt from "bcrypt";

import jwt from 'jsonwebtoken'

//! register
const userRegister = async (req , res)=>{
    const {fullname,email,username,mobile,password}  = req.body
 try {
if(!fullname || !email || !username || !mobile || !password){
    return res.status(400).json({message : "All fields are required"})
}

//* check already exists or not
const userExists = await User.findOne({$or : [{ email: email }, { username: username } , {mobile: mobile}]})

if(userExists){
    return res.status(400).json({message : "Email or username or mobile already exists"})
}
 if (password.length < 6) {
            return res.status(400).json({ message: "Password must be at least 6 characters" });
        }
    
const user = await User.create({fullname,username,email,password,mobile})
user.password = undefined
//!token
const token = jwt.sign({id : user._id, fullname: user.fullname, email: user.email, username: user.username} , 
 process.env.JWT_SECRET,
 {expiresIn : "1d"}
)


res.status(201).cookie("token",token,{
    httpOnly : true,
    secure: process.env.NODE_ENV !== "development",
    maxAge: 24 * 60 * 60 * 1000,
    sameSite: process.env.NODE_ENV === "development" ? "Lax" : "None"
}).json({success : true , message : "User Registered Successfully" ,user,token})

 } catch (error) {
    console.log(error)
    res.status(500).json({ error : error.message})
 }
}

//!login

const userLogin = async (req,res)=>{
const {username ,password} = req.body
    try {
        if(!username || !password){
            return res.status(400).json({message : "All fields are required"})
        }

        //!check user 
        const user = await User.findOne({$or:[{email:username}, {username:username}]})
if(!user){
    return res.status(400).json({message:"User Not Found"})
}
     const isPasswordSame = await bcrypt.compare(password, user.password)
     if(!isPasswordSame){
        return res.status(400).json({message: "Incorrect Password"})
     }


const token = jwt.sign({id : user._id, fullname: user.fullname, email: user.email, username: user.username} , 
 process.env.JWT_SECRET,
 {expiresIn : "1d"})

//* don't send password
user.password = undefined

 res.status(200).cookie("token", token,{
    httpOnly : true,
    secure: process.env.NODE_ENV !== "development",
    maxAge : 24 * 60 * 60 * 1000,
    sameSite: process.env.NODE_ENV === "development" ? "Lax" : "None"
 }).json({success : true, message : "User Logged In Successfully" , user,token})

    } catch (error) {
        console.log(error)
    res.status(500).json({ error : error.message})
    }
}


const userLogout = async (req, res) => {
    try {
        res.cookie("token", "", {
            maxAge: 0,
        })
        res.status(200).json({ msg: "User Logged out Successfully" })
    } catch (error) {
        res.status(500).json({ msg: 'Server Error', error: error.message })
    }
}

export {userRegister,userLogin,userLogout}