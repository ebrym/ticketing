import express from 'express';
const router = express.Router();

router.post('/api/users/signin', (req, res) => {
    res.send({
        id: 1,
        name: 'John Doe',
        email: 'j@d.c'
    });
});

export { router as signinRouter };