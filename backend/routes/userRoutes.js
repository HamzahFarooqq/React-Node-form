import express from 'express';
import User from '../models/User.js';
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import {successResponse, errorResponse, generateSecretKey} from '../utilities/helpers.js'
import { authorizeRoles, verifyToken } from '../middleware/authMiddleware.js';
import { validate } from '../middleware/validate.js';
import { loginSchema, registerSchema } from '../validation/userValidation.js';
import { sendResetEmail } from '../utilities/mailer.js';

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

router.post('/register', validate(registerSchema), async(req,res)=>{
    try{        
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


router.post('/login', validate(loginSchema), async(req,res)=>{
    try {
        const {email, password} = req.body;
        const isEmail = await User.findOne({email});    
        if(!isEmail){            
            errorResponse(res, 400, 'email does not exists.');
        }
        const passwordVerify = await bcrypt.compare(password, isEmail.password);
        if(passwordVerify){
            const token = jwt.sign({ id: isEmail._id, email: isEmail.email }, process.env.JWT_SECRET, {expiresIn: '15m'});        
            successResponse(res, 200, 'User logged in', isEmail, token);
        } else {            
            errorResponse(res, 400, 'Incorrect password');
        }

    } catch (error) {
        errorResponse(res, 400, error.message)
    }        
})


// FORGET PASS 

router.post('/reset/password', async(req,res)=>{
    try{
        const {email} = req.body;          
        const user = await User.findOne({ email });
           
        user.resetToken = generateSecretKey();
        user.resetTokenExpiry = new Date(Date.now() + 10*60*1000);
        await user.save();
        await sendResetEmail(user.email, user.resetToken);
        return successResponse(res, 200, 'email sent', user);

    } catch (error) {        
        return errorResponse(res, 500, error.message);
    }    
});

router.post('/reset/password/update', async(req,res)=>{
    // const { resetToken } = req.params;
    const { token } = req.query;
    const { newPassword } = req.body;
    const user = await User.findOne({
        resetToken: token,
    })
    if (!user) {
      return errorResponse(res, 404, 'Invalid or expired token');
    }
    if(Date.now() > user.resetTokenExpiry){
        return errorResponse(res, 500, 'Reset Link is Expired.');
    }

    user.password = await bcrypt.hash(newPassword, 10);    
    user.resetToken = undefined;
    user.resetTokenExpiry = undefined;
    
    await user.save();
    return successResponse(res, 200, 'password changed.', user);

});


// SEARCH API FOR USERS
router.get('/search', async(req,res)=>{
    try{
        const {query} = req.query;
        if( !query || !query.trim()=='' ){
            return errorResponse(res, 404, 'search query is required');
        }
        const regex = new RegExp(query, 'i');
        const users = await User.find({
            $or:[
                {name: {$regex: regex}},
                {email: {$regex: regex}}
            ]
        }).select('-password');

        return successResponse(res, 200, 'search query fetched', users);
    } catch (error) {
        return errorResponse(res, 400, error.message)
    }
    
})

// SEARCH GET api , PAGINATION , SORTING, FILTRATION
router.get('/search', async(req,res)=>{
    try{
        const {query,sortBy,order,page,limit} = req.query;
        const filters = {};
        if(query){        
            filters.$or = [
                {name: {$regex:query, $options:'i'}},
                {email: {$regex:query, $options:'i'}},
                {role: {$regex:query, $options:'i'}},
            ]
        }  
            
            if (age === 'below18') {
                filters.age = { $lt: 18 };
                } else if (age === '18') {
                filters.age = 18;
                } else if (age === 'above18') {
                filters.age = { $gt: 18 };
            }

            const skip = (parseInt(page)-1) * parseInt(limit);
            const sortOrder = order == 'asc' ? 1 : -1;

            const users = await User.find(filters)
            .sort({ [sortBy]: sortOrder })
            .skip(skip)
            .limit(parseInt(limit))
            .select('-password');

            const total = await User.countDocuments(filters);

            res.status(200).json({total, page: parseInt(page), limit: parseInt(limit), users});
        
    } catch(err){
        return errorResponse(res, 400, 'something wrong in searching');
    }
})




// PROTECTED ROUTES 

// router.get('/dashboard', verifyToken, authorizeRoles('user','admin'), async(req,res) => {
//     return;
// })








export default router;