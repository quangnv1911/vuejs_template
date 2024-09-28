import account from "../services/account.js";
const login = async (req, res) => {
    try {
        const { username, password } = req.body;
        const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        const isCheckEmail = reg.test(username);
        if (!isCheckEmail) {
            return res.status(404).json({
                status: "ERR",
                message: "This is not a email"
            })
        }
        const response = await account.login(req.body);
        res.status(200).json(response);
    } catch (error) {
        console.log('Controller account.js: login', error);
        res.status(404).json(error)
    }
}

export default {
    login
}