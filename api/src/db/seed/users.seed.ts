import { UserModel as User } from "../../models/user";
import mongoose from "../db";

const createUser = async () => {
    try {
        await User.deleteMany({});

        const users = await User.insertMany([
            {
                email: 'don@test.com',
                password: '1234',
                username: 'Donny',
            },
            {
                email: 'ok@test.com',
                password: '1234',
                username: 'OK',
            },
            {
                email: 'alice@test.com',
                password: '1234',
                username: 'Alice',
            },
            {
                email: 'matthieu@test.com',
                password: '1234',
                username: 'Matthieu',
            },
            {
                email: 'camille@test.com',
                password: '1234',
                username: 'Camille',
            },
        ]);

        console.log('Users created:', users);
    } catch (error) {
        console.error('Error creating users:', error);
    } finally {
        await mongoose.disconnect();
        console.log('MongoDB disconnected');
    }
};

createUser();