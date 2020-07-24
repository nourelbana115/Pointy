let { Merchant } = require('./../db/models/merchant');

let authenticate = (req, res, next) => {
	let token = req.cookies.jwtToken;
	Merchant.findByToken(token).then((merchant) => {
		if (!merchant) {
			return Promise.reject();
		}
		req.merchant = merchant;
		req.token = token;
		res.locals.currentMerchant = req.merchant
		next();
	}).catch((e) => {
		res.status(401).redirect('/authentication/login');
	});
};

module.exports = { authenticate };