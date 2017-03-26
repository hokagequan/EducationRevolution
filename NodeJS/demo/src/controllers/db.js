import mongoose from 'mongoose';

const dbHost = 'mongodb://127.0.0.1'

mongoose.connect(dbHost);

export default mongoose;