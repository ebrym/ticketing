import express from 'express';
const router = express.Router();

router.get('/api/users/currentuser', (req, res) => {
    res.send({
        id: 1,
        name: 'John Doe',
        email: 'j@d.c'
    });
});

export { router as currentUserRouter };