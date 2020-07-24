let { Merchant } = require('./../db/models/merchant');

let checkStatus = (req, res, next) => {
	let token = req.cookies.jwtToken
	Merchant.findByToken(token).then((merchant) => {
		if (merchant.status === 'inactive') {
			return Promise.reject();
		}
		next();
	}).catch((e) => {
		res.status(401).send();
	});
};

module.exports = { checkStatus };