import express from 'express';
import {json} from 'body-parser';

const app = express();

app.use(json());



app.get('/api/users/currentuser', (req, res) => {
    res.send({
        id: 1,
        name: 'John Doe',
        email: 'j@d.c'
    });
});

app.listen(3000, () => {
    console.log('Listening on port 3000!!!!!!!');
});