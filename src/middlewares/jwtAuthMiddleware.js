import jwt from 'jsonwebtoken';

const jwtAuth = (req, res, next) => {
    // Read token from the request's Authorization header
    const token = req.headers['authorization'];

    // If there's no token, send a 401 Unauthorized response
    if (!token) {
        res.status(401).send('Unauthorized access');
    }

    // If a token is present, attempt to verify it
    try {
        const payload = jwt.verify(token, '9e5mwXmL0I');
        console.log(payload);
        req.userId=payload.userId;
    } catch (error) {
        res.status(401).send('Unauthorized access');
    }

    // Continue to the next middleware or route handler
    next();
};

export default jwtAuth;
