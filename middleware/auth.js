const jwt = require('jsonwebtoken');
require('dotenv').config();

exports.authenticated = (req, res, next) => {
	const token = req.cookies?.token;

	if (!token) {
		res.status(403).send({ 
			success: false,
			message: 'Authentication failed: need token!' 
		});
		return;
	}

	jwt.verify(token, process.env.SECRET_TOKER, (err, decoded) => {
		if (err) {
			return res.status(403).send({ 
				success: false,
				message: 'Your Token is Longer Valid' 
			});
		}

		userId = decoded.id;
		next();
	});
};