import { v4 as uuid4} from "uuid";
import {createHmac} from "crypto";
import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
    name:{
        type:String,
        trim:true,
        require:true,
        unique: 32
    },
    email:{
        type: String,
        trim:true,
        require:true,
        unique: 32
    },
    hashed_password: {
        type:String,
        require:true
    },
    about: {
        type: String,
        trim: true
    },
    salt:{
        type:String
    },
    role:{
        type:Number,
        default: 0
    },
    history:{
        type: Array,
        default:[]
    }
},{timestamps: true});

userSchema.virtual("password")
.set(function(password){
    this.salt= uuid4();
    this.hashed_password = this.encryPassword(password);

});
userSchema.methods={
    authenticate:function(password){
        return this.encryPassword(password) == this.hashed_password;
    },
    encryPassword(password){
        if(!password) return;
        try {
            return createHmac('sha256', this.salt).update(password).digest('hex');
        } catch (error) {
            console.log(error);
        }
    }
}
export default mongoose.model('Users', userSchema)