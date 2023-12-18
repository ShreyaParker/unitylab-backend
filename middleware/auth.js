import jwt from 'jsonwebtoken';

export const verifyToken = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (authHeader) {
        const token = authHeader.split(' ')[1];
        jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
            if (err) {

                return res.status(401).json({ message: 'Invalid token' });
            }


            req.user = { ...decoded };
            next();
        });
    } else {
        return res.sendStatus(401);
    }
};