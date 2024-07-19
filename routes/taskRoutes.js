import express from 'express';
import User from '../Models/Usermodel.js'

const router = express.Router();

router.get('/', (req,res) => {
    res.json({
        message:"task route working fine"
    })
})

export default router;