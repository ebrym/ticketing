import request from 'supertest';
import { app } from '../../app';

// it('response with current user details', async () => {
//     const cookie = await global.signin();
//     await request(app)
//         .get('/api/users/currentuser')
//         .set('Cookie', cookie)
//         .expect(200);
// });