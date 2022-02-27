import express from 'express';
const router = express.Router();

router.post('/api/users/signout', (req, res) => {
    res.send({
        id: 1,
        name: 'John Doe',
        email: 'j@d.c'
    });
});

export { router as signoutRouter };