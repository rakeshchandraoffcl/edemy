import bcrypt from 'bcrypt';

export const hashPassword = (password) => {
	return new Promise((resolve, reject) => {
		bcrypt.genSalt(12, (err, salt) => {
			if (err) {
				reject(err);
			}
			bcrypt.hash(password, salt, (error, hash) => {
				if (error) {
					reject(error);
				}
				resolve(hash);
			});
		});
	});
};
export const comparePassword = (password, hashedPassword) => {
	return bcrypt.compare(password, hashedPassword);
};
