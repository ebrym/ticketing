import express, {Request, Response} from 'express';
import {body, validationResult} from 'express-validator';
import { RequestValidationError } from '../errors/request-validation-error';
import { DatabaseConnectionError } from '../errors/database-connection-error';


const router = express.Router();

router.post('/api/users/signup',[
    body('email')
        .isEmail()
        .withMessage('Email must be valid'),
    body('passsword')
        .trim()
        .isLength({min: 4, max: 20})
        .withMessage('Password must be between 4 and 20 characters')
], (req: Request, res:Response) => {

    const errors = validationResult(req);
    if(!errors.isEmpty()){
       throw new RequestValidationError(errors.array());
    }
    const {email, password} = req.body;

    console.log("Creating a user");
    // new users




    throw new DatabaseConnectionError('Could not connect to the database');
    res.send({
        id: 1,
        name: 'John Doe',
        email: 'j@d.c'
    });
});

export { router as signupRouter };