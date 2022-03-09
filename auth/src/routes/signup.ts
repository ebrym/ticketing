import express, {Request, Response} from 'express';
import {body, validationResult} from 'express-validator';
import jwt  from 'jsonwebtoken';
import { User } from '../models/user';
import { BadRequestError, validateRequest } from '@ebrym/common';


const router = express.Router();

router.post('/api/users/signup',[
    body('email')
        .isEmail()
        .withMessage('Email must be valid'),
    body('password')
        .trim()
        .isLength({min: 4, max: 20})
        .withMessage('Password must be between 4 and 20 characters')
],
validateRequest,
 async (req: Request, res:Response) => {
    try{
  
    const {email, password} = req.body;

    // checking if user exist with same email
    const isUserExists = await User.findOne({email});

    if(isUserExists){
        throw new BadRequestError('User already exists');
    }

    const user = User.build({email, password});
    await user.save();


    // signing the jwt token

    const userJwt = jwt.sign({
        id: user.id,
        email: user.email
    }, process.env.JWT_KEY!);

    req.session = {
        jwt: userJwt
    };



    res.status(201).send({message: 'User created successfully', data: user});
   
}catch(err){
    console.log(err);
}
  
});

export { router as signupRouter };