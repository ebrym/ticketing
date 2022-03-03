import express, {Request, Response} from 'express';
import {body, validationResult} from 'express-validator';
import jwt  from 'jsonwebtoken';
import { User } from '../models/user';
import { RequestValidationError } from '../errors/request-validation-error';
import { BadRequestError } from '../errors/bad-request-error';


const router = express.Router();

router.post('/api/users/signup',[
    body('email')
        .isEmail()
        .withMessage('Email must be valid'),
    body('password')
        .trim()
        .isLength({min: 4, max: 20})
        .withMessage('Password must be between 4 and 20 characters')
], async (req: Request, res:Response) => {

   // console.log('here handler', req);
    const errors = validationResult(req);
    if(!errors.isEmpty()){
       throw new RequestValidationError(errors.array());
    }
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
    }, 'asdf');

    req.session = {
        jwt: userJwt
    };



    res.status(201).send({message: 'User created successfully', data: user});
    console.log("Creating a user");
  
});

export { router as signupRouter };