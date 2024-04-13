import express from 'express';
import userRoutes from './user/user.route';

const app = express();

app.use(express.json());
app.use('/users', userRoutes);

app.listen(3001, () => {
    console.log('Server running on http://localhost:3001');
});