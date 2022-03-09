import express from 'express';
import { currentUser, requireAuth } from '@ebrym/common';
import { User } from '../models/user';



const router = express.Router();

router.get('/api/users', currentUser,requireAuth, async (req, res) => {
   
   const users = await User.find({});
    return res.send({data: users});
});

export { router as allUsersRouter };