import jwt from 'jsonwebtoken';
const authMiddleware = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        jwt.verify(token, process.env.PRIVATE_KEY, (err, user) => {
            if(err) {
                return res.status(401).json({
                    status: "ERR",
                    message: "The authentication",
                    err: err.name
                })
            } else {
                // console.log(user);
                req.userId = user.id;
                next();
            }
        })
    } catch (err) {
        return res.status(401).json({
            status: "ERR",
            message: "The authentication"
        });
    }

    
}

export {
    authMiddleware
}