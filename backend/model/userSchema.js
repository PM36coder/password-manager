import { Schema , model }  from "mongoose";
import bcrypt from "bcrypt"
const userSchema = new Schema({

    fullname : {type : String , required : true,trim : true,},
    username : {type : String , required : true , unique : true,trim : true},
    email : {type : String , required : true , unique : true, lowercase : true , trim : true , match : [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/], },
    mobile : {type : String ,  required : true, unique : true},
    password : {type : String , required : true},
}, { timestamps: true })

userSchema.pre("save", async function(next) {
    if (!this.isModified('password')) return next()
    try {
        const salt = await bcrypt.genSalt(10)
        this.password = await bcrypt.hash(this.password, salt)
        next()
    } catch (error) {
        next(error)
    }
})


export const User = model("User", userSchema)