import express from 'express';
import User from '../models/User.js';
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import {successResponse, errorResponse} from '../utilities/helpers.js'

const router = express.Router();



router.get('/', async(req,res) => {
    try{
        const users = await User.find();
        res.status(200).json(users);
    }
    catch(err){
        console.log(err.message);
        res.status(400).json({message: 'users not found'})
    }
});


router.get('/:id', async(req,res) => {
    try{
        const user = await User.findById(req.params.id);
        res.status(200).json(user);
    }
    catch(err){
        console.log(err.message);
        res.status(400).json({message: 'user not found'})
    }
});


router.post('/create', async(req,res) => {
    try{
        const {name,email,password} = req.body;
        const user =  new User({
            name,email,password
        });

        const userSave = await user.save();
        res.status(200).json(userSave);
    }
    catch(err){
        console.log(err.message);
        res.status(400).json({message: 'user not created'})
    }
});


router.put('/:id', async(req,res) => {
    try{
        const user = await User.findByIdAndUpdate(req.params.id, req.body, {new:true});
        res.status(200).json(user);
    }
    catch(err){
        console.log(err.message);
        res.status(500).json({message: 'user not updated'})
    }
});


router.delete('/:id', async(req,res) => {
    try{
        const user = await User.findByIdAndDelete(req.params.id);
        res.status(200).json(user);
    }
    catch(err){
        console.log(err.message);
        res.status(500).json({message: 'user not deleted'})
    }
});





// AUTH ROUTES 

router.post('/register', async(req,res)=>{
    try{
        // console.log(req.body);
        const {name,email,password} = req.body;
        const isExist = await User.findOne({email});
        if(isExist){            
            errorResponse(res, 400, 'user already exists')
        }

        const saltRound = 10;
        const hashPassword = await bcrypt.hash(password, saltRound);        
        const newUser = new User({name,email,password: hashPassword});
        newUser.save();
        successResponse(res, 200, 'new user registered', newUser);
        
    }
    catch (err){
        errorResponse(res, 400, err.message);
    }
});


router.post('/login', async(req,res)=>{
    try {
        const {email, password} = req.body;
        const isEmail = await User.findOne({email});    
        if(!isEmail){            
            errorResponse(res, 400, 'email does not exists.');
        }
        const passwordVerify = await bcrypt.compare(password, isEmail.password);
        if(passwordVerify){
            const token = jwt.sign({ id: isEmail._id, email: isEmail.email }, process.env.JWT_SECRET, {expiresIn: '15m'});        
               return successResponse(res, 200, 'User logged in', isEmail, token);
        } else {            
            errorResponse(res, 400, 'Incorrect password');
        }

    } catch (error) {
        errorResponse(res, 400, error.message)
    }        
})










export default router;