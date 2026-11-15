const jwt = require('jsonwebtoken');
const models = require('../models');
require('dotenv').config();
Bcrypt = require('bcryptjs');

const Users = models.users;

exports.login = (email, password) => {
    var dateNow = Date.now();
    const bodyToken = Bcrypt.hashSync('_web_' + email + password + dateNow);

    return Users.findOne({
        where: { email }
    })
        .then((data) => {
            if (data) {
                if (Bcrypt.compareSync(password, data.password)) {
                    Users.update({token: bodyToken}, {where: { email: email }});

                    const token = jwt.sign({ id: data.id }, process.env.SECRET_TOKER);
                    return {
                        data: {
                            id: data.id,
                            name: data.name,
                            email: data.email,
                            token: token
                        },
                        success: true,
                        message: 'login successfully'
                    }
                } else {
                    return { data: null, success: false, message: 'password is invalid!' }
                }
            } else {
                return { data: null, success: false, message: 'email is invalid!' }
            }
        })
        .catch((error) => {
            return { data: null, success: false, message: 'Error: ' + error?.message }
        });
};