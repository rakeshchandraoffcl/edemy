import cors from 'cors';
import express from 'express';
import mongoose from 'mongoose';
import { readdirSync } from 'fs';
import csrf from "csurf";
import cookieParser from "cookie-parser";


const csrfProtection = csrf({ cookie: true })
const morgan = require('morgan');
require('dotenv').config();

// Create Express
const app = express();
app.use(cookieParser())

// db
mongoose
	.connect(process.env.DATABASE, {
		useNewUrlParser: true,
		useFindAndModify: false,
		useUnifiedTopology: true,
		useCreateIndex: true,
	})
	.then(() => console.log('DB connected'))
	.catch((error) => {
		`Mongo error - ${error}`;
	});

// Apply Middlewares
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// Route
readdirSync('./routes').map((r) => app.use('/api', require(`./routes/${r}`)));
app.get('/api/get-csrf-token',csrfProtection,(req,res) => {
	res.status(200).json({csrfToken: req.csrfToken()})
})

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});
