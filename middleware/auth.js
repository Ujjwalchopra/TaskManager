import jwt from 'jsonwebtoken'
import User from '../Models/Usermodel.js'

const auth = async(req,res,next)=> {
    try {
        //extracting token from req
        const token = req.header('Authorization').replace('Bearer ','');
        //verity the token or decode the token
        const decode = jwt.verify(token,process.env.JWT_SECRET_KEY);
        //extracting the user id from token
        const user= await User.findOne({
            _id:decode._id
        })
       if(!user){
        throw new Error('first login the proceed')
       }
       req.user= user;
       req.token= token;
       next();

    } catch (error) {
        res.status(400).send({error: error.message});
    }
}

export default auth;