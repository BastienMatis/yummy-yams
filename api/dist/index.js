import express from 'express';
import userRoutes from './user/user.route';
import connectDB from "./db/db";
const app = express();
app.get('/', (req, res) => res.send('Salut'));
app.use(express.json());
app.use('/users', userRoutes);
connectDB().then(() => {
    app.listen(3001, () => {
        console.log('Server running on http://localhost:3001');
    });
});
