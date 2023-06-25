const { expressjwt: jwt } = require('express-jwt');

// instantiate the jwt token validation middleware
const isAuthenticated = jwt({
  secret: process.env.TOKEN_SECRET,
  algorithms: ['HS256'],
  requestProperty: 'payload', // we'll access the decoded jwt in req.payload
  getToken: getTokenFromHeaders // the function to extract the jwt
});

// the function passed in the getToken property above
function getTokenFromHeaders(req) {
  // checks if the token is on the request headers
  // has the following format:
  // const request = {
  //   headers: {
  //     authorization: 'Bearer aksjhgkahrgkhsdfçkjhçk'
  //   }
  // }

  if (
    req.headers.authorization &&
    req.headers.authorization.split(' ')[0] === 'Bearer'
  ) {
    const token = req.headers.authorization.split(' ')[1];
    return token;
  }

  return null;
}

// export the middleware to use it in protected routes
module.exports = { isAuthenticated };
