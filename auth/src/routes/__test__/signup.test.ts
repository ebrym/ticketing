import request from 'supertest';
import { app } from '../../app';

it('returns a 201 on successful signup', async () => {
    return request(app)
        .post('/api/users/signup')
        .send({
            email: 'ibrodex@gmail.com',
            password: 'password123'
        })
        .expect(201);
});

it('returns a 400 with an invalid email', async () => {
    return request(app)
        .post('/api/users/signup')
        .send({
            email: 'ibrodexgmail.com',
            password: 'password123'
        })
        .expect(400);
});
it('returns a 400 with an invalid password', async () => {
    return request(app)
        .post('/api/users/signup')
        .send({
            email: 'ibrodex@gmail.com',
            password: 'pas'
        })
        .expect(400);
        
});
it('returns a 400 with missing email and password', async () => {
    await  request(app)
    .post('/api/users/signup')
    .send({
        email: 'ibrodex@gmail.com'})
    .expect(400);

    await request(app)
        .post('/api/users/signup')
        .send({
            password: 'password123'})
        .expect(400);
});

test('disallows duplicate email', async () => {
    await  request(app)
    .post('/api/users/signup')
    .send({
        email: 'ibrodex@gmail.com',
        password: 'password123'})
    .expect(201);
    await  request(app)
    .post('/api/users/signup')
    .send({
        email: 'ibrodex@gmail.com',
        password: 'password123'})
    .expect(400);
});

it('it set cookie after successful signup', async () => {
    const response =  request(app)
        .post('/api/users/signup')
        .send({
            email: 'ibrodex1@gmail.com',
            password: 'password123'})
        .expect(201);
   
        expect(response.get('Set-Cookie')).toBeDefined();
});