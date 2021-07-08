const jwt = require("express-jwt");
const secret = process.env.JWT_SECRET;

const authenticate = jwt({
	secret: secret
});
// app.use('/api', expressJwt({secret: secret}));
module.exports = authenticate;
