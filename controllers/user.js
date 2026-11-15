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
        res.send({
            success: true,
            message: 'success',
            data: ress?.data,
            token: ress?.token
        });
    } else {
         res.send({
            success: false,
            message: ress?.message,
            data: null,
            token: ""
        });
    }
};

