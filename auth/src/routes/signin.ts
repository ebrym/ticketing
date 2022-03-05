import express, {Request, Response} from 'express';
import { body, validationResult } from 'express-validator';
import jwt  from 'jsonwebtoken';
import { User } from '../models/user';
import { BadRequestError } from '../errors/bad-request-error';
import { validateRequest } from '../middleware/validate-request';
import { Password } from '../services/password';
const router = express.Router();

router.post('/api/users/signin', [
    body('email')
        .isEmail()
        .withMessage('Email must be valid'),
    body('password')
        .trim()
        .notEmpty()
        .withMessage('Password must be entered')
],
validateRequest,
async (req: Request, res:Response) => {
    try{
 
    const {email, password} = req.body;

    // checking if user exist with same email
    const isUserExists = await User.findOne({email});


    if(!isUserExists){
        throw new BadRequestError('User does not exists');
    }

    const passwordMatch = await Password.compare(isUserExists.password,password);
    if(!passwordMatch){
        throw new BadRequestError('Invalid credentials');
    }


    // signing the jwt token

    const userJwt = jwt.sign({
        id: isUserExists.id,
        email: isUserExists.email
    }, process.env.JWT_KEY!);

    req.session = {
        jwt: userJwt
    };



    res.status(200).send({message: 'signin successful', data: isUserExists});
   
}catch(err){
    console.log(err);
}
  
});

export { router as signinRouter };