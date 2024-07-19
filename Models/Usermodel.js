import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required:true
    },
    email: {
        type:String,
        required: true,
        unique:true
    },
    password: {
        type: String,
        required:true
    }
})

//before saving the password crypt the password. 

userSchema.pre('save',async function(next) {
    const user = this;
    if(user.isModified('password')){
        user.password = await bcrypt.hash(user.password, 8)
    }
    next();
})

const User= mongoose.model('User',userSchema);
export default User;