const userService = require('../services/user')

exports.login = async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    if (!email || !password) {
        res.status(500).json({
            success: false,
            message: 'email and password required!'
        });
        return;
    }

    const ress = await userService.login(email,password)

    if(ress.success){
        res.cookie("token", ress?.token, {
            httpOnly: true,
            secure: true,
            sameSite: "lax",
            maxAge: 24 * 60 * 60 * 1000
        });

        res.status(200).send({
            success: true,
            message: ress?.message,
            data: ress?.data,
        });
    } else {
         res.status(400).send({
            success: false,
            message: ress?.message,
            data: null,
        });
    }
};

exports.register = async (req, res) => {
    const { name, email, password } = req.body;

    const ress = await userService.register(name,email,password)

    if(ress?.success){
        res.cookie("token", ress?.token, {
            httpOnly: true,
            secure: true,
            sameSite: "lax",
            maxAge: 24 * 60 * 60 * 1000
        });

        res.status(200).send({
            success: true,
            message: ress?.message,
            data: ress?.data,
        });
    } else {
         res.status(400).send({
            success: false,
            message: ress?.message,
            data: null,
        });
    }
}