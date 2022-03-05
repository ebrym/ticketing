import request from 'supertest';
import { app } from '../../app';

it('returns a 200 on successful signin', async () => {
    await request(app)
        .post('/api/users/signin')
        .send({
            email: 'ibrodex@gmail.com',
            password: 'password123'
        })
        .expect(200);
});
it('fails when email does not exist', async () => {
    await request(app)
        .post('/api/users/signin')
        .send({
            email: 'ibrodex2121@gmail.com',
            password: 'password123'
        })
        .expect(400);
});
it('fails when password is invalid', async () => {
    await request(app)
    .post('/api/users/signup')
    .send({
        email: 'ibrodex@gmail.com',
        password: 'password123'
    })
    .expect(201);

    return request(app)
        .post('/api/users/signin')
        .send({
            email: 'ibrodex@gmail.com',
            password: 'password1'
        })
        .expect(400);
});

it('return a cookie when credentials are correct', async () => {
    await request(app)
    .post('/api/users/signup')
    .send({
        email: 'ibrodex@gmail.com',
        password: 'password123'
    })
    .expect(201);

    const response =  request(app)
        .post('/api/users/signin')
        .send({
            email: 'ibrodex@gmail.com',
            password: 'password123'
        })
        .expect(200);

        expect(response.get('Set-Cookie')).toBeDefined();
});