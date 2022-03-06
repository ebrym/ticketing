import {MongoMemoryServer} from 'mongodb-memory-server';
import mongoose from 'mongoose';
import request from 'supertest';
import {app} from '../app';

declare global {
    namespace NodeJS {
        interface Global {
            signin(): Promise<string[]>
        }
    }
}

let mongo: any;
beforeAll(async () => {
    process.env.JWT_KEY = 'ibrodex';
   // mongo = new MongoMemoryServer().;
     mongo = await MongoMemoryServer.create();

    const mongoUri = await mongo.getUri();

    await mongoose.connect(mongoUri);
});

beforeEach(async () => {
    jest.setTimeout(10000);
    const collections = await mongoose.connection.db.collections();

    for(let collection of collections){
        await collection.deleteMany({});
    }
});

afterAll(async () => {
        await mongo.stop();
        await mongoose.connection.close();
    }
);

global.signin = async () => {
    const email = 'ibrodex@gmail.com';
    const password = 'password123';

    const response = await request(app)
    .post('/api/users/signup')
    .send({
        email,password
    })
    .expect(201);

    const cookie = response.get('Set-Cookie');

    return cookie;
}