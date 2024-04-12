import mongoose from 'mongoose';

// mettre env
const MONGO_URI = 'mongodb://127.0.0.1:27017/yummi-yum';

mongoose.connect(MONGO_URI)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

export default mongoose;