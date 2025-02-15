import mongoose from 'mongoose';

export const connectDB = async () => {
    try {
        
        const conn = await mongoose.connect(process.env.MONGODB_URI);
        console.log(`MONGODB CONNECTED : ${conn.connection.host}`);
    }
    catch(error){
        console.log('Error connection to MongoDB : ', error.message);
        process.exit(1); // 1 is failure , 0 is success 
    }
}