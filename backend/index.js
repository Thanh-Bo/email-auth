import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './lib/db.js';
import authRoutes from './routes/auth.route.js';
import cookieParser from 'cookie-parser';
import path from 'path';
import cors from 'cors';
dotenv.config();

const PORT = process.env.PORT || 5000
const app = express();
const __dirname = path.resolve();

app.use(cors({ origin : "http://localhost:5173", credentials : true}))
app.use(express.json()); // allows us to parse incoming requests:req.body
app.use(cookieParser());


app.use('/api/auth', authRoutes);
if (process.env.NODE_ENV === "production") {
	app.use(express.static(path.join(__dirname, "/frontend/dist")));

	app.get("*", (req, res) => {
		res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
	});
}

app.listen(PORT, () => {
    connectDB();
    console.log("Server running on port : ", PORT);
}); 