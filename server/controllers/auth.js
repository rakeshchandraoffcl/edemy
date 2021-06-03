import { comparePassword, hashPassword } from '../utils/auth';

import User from '../models/user';
import jwt from 'jsonwebtoken';

export const register = async (req, res) => {
	try {
		console.log(req.body);
		const { name, email, password } = req.body;

		// Validation
		if (!name) return res.status(400).send('Name is required');
		if (!password || password.length < 6)
			return res
				.status(400)
				.send(
					'Password is required and should be minimum 6 characters long'
				);
		let userExist = await User.findOne({ email }).exec();
		if (userExist) return res.status(400).send('Email is taken');

		// hash password
		const hashedPassword = await hashPassword(password);
		const user = await User.create({
			name,
			email,
			password: hashedPassword,
		});
		console.log('saved user', user);
		res.status(200).json({ ok: true });
	} catch (error) {
		console.log(error);
		res.status(400).send('Error. Try again');
	}
};
export const login = async (req, res) => {
	try {
		const { email, password } = req.body;

		// Validation
		if (!email) return res.status(400).send('Email is required');
		if (!password) return res.status(400).send('Password is required');

		let user = await User.findOne({ email }).exec();
		if (!user) return res.status(400).send('No user found');
		const match = await comparePassword(password, user.password);
		// create token
		const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
			expiresIn: '7d',
		});
		// return user and cookie
		user.password = undefined;
		res.cookie('token', token, {
			httpOnly: true,
			// secure: true
		});
		res.json(user);
	} catch (error) {
		console.log(error);
		res.status(400).send('Error. Try again');
	}
};

export const logout = async (req, res) => {
	try {
		res.clearCookie("token");
		res.status(200).json({message: 'Logged out successfully'})
	} catch (err) {
		console.log(err);
		res.status(400).send('Error. Try again');
	}
}

export const currentUser = async (req, res) => {
	try {
		const user = await User.findById(req.user._id).select('-password').exec();
		res.status(200).json({user})
	} catch (err) {
		console.log(err);
		res.status(400).send('Error. Try again');
	}
}
