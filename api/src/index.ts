// import express from 'express'

// const app = express()

// app.get('/', (req, res) => res.send('Salut'))

// app.listen(3001, () => console.log('app ready on :3001'))

import express from 'express';
import userRoutes from './user/user.route';
import mongoose from "./db/db";

const app = express();

app.use(express.json());
app.use('/users', userRoutes);

app.listen(3001, () => {
    console.log('Server running on http://localhost:3001');
});