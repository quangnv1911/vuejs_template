import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import Account from '../models/Account.js';

const login = (userInfo) => {
    return new Promise((resolve, reject) => {
        const { username, password } = userInfo;
        Account.findOne({ username: username })
            .then((user) => {
                if (user) {
                    bcrypt.compare(password, user.password, (err, result) => {
                        if (result) {
                            const accessToken = generalAccessToken({
                                id: user._id
                            });

                            resolve({
                                accessToken: accessToken,
                            });
                        } else {
                            reject({
                                status: "ERR",
                                message: "Wrong password",
                            });
                        }
                    });
                } else {
                    reject({
                        status: "ERR",
                        message: "Wrong email",
                    });
                }
            })
            .catch((e) => {
                reject(e);
            });
    })
}

const generalAccessToken = (payload) => {
    const accessToken = jwt.sign({
        ...payload
    }, process.env.PRIVATE_KEY, {
        expiresIn: '6h',
        algorithm: "HS256"
    })
    
    return accessToken;
}


export default {
    login
}