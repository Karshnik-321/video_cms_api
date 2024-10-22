const validTokens = [
    "token12345",  // Replace with your actual tokens
    
];

const excludePaths = [

];

module.exports = {
    authTokenMiddleware: (req, res, next) => {
        // Check if the path is excluded from authentication
        if (excludePaths.includes(req.path)) {
            return next();
        }

        // Get the authorization header
        const authHeader = req.headers['authorization'];
        
        if (!authHeader) {
            return res.status(401).json({ message: "Authorization header missing" });
        }

        // Check if the header starts with 'Bearer '
        if (!authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ message: "Invalid authorization header format" });
        }

        // Extract the token from the header
        const token = authHeader.split(' ')[1];

        // Check if the token is valid
        if (!validTokens.includes(token)) {
            return res.status(401).json({ message: "Invalid token" });
        }

        // Proceed to the next middleware or route handler
        next();
    }
};
