import express from 'express';
import User from '../Models/Usermodel.js'
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'

const router = express.Router();

router.get('/', (req, res) => {
    res.json({
        message: "User route working fine"
    })
})

//register the user
router.post('/register', async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const user = new User({ name, email, password });
        await user.save();
        res.status(201).send({ user, message: "user created successfully" });
    } catch (error) {
        res.status(400).send({ error: error });
    }
})

//login a user
router.post('/login', async (req, res) => {
    try {
        const { emai, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            throw new Error('Unable to login,invalid credentials');
        }
        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
            throw new Error('Unable to login,invalid password');
        }
        const token = jwt.sign({
            _id: user._id.toString()
        }, process.env.JWT_SECRET_KEY)
        res.send({ user, token, message: 'User loggedin successfully' })
    } catch (error) {
        res.status(400).send({ error: error });
    }
})


export default router;