import { UserModel as User } from "../../models/user";

const createUser = async () => {
    const newUser = new User({
        email: 'don@test.com',
        password: 1234,
        username: 'Donny',
    });

    try {
        const result = await newUser.save();
        console.log('User saved:', result);
    } catch (error) {
        console.error('Error saving user:', error);
    }
};

createUser();