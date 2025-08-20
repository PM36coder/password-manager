import {Schema , model} from "mongoose"

const managerPassSchema = new Schema({
    user : {type: Schema.Types.ObjectId, ref : "User", required : true},
    website : {type : String, required : true , trim : true},
    url : {type : String, required : true , trim : true},
    username : {type : String, required : true, trim : true},
    password : {type : String, required : true, trim : true}
}, {timestamps : true})

export const ManagerPass = model("ManagerPass", managerPassSchema)