const jwt = require('jsonwebtoken');
const models = require('../models');
const bcrypt = require('bcryptjs');
require('dotenv').config();
Bcrypt = require('bcryptjs');

const Users = models.users;

exports.login = (email, password) => {
    return Users.findOne({
        where: { email }
    })
        .then((data) => {
            if (data) {
                if (Bcrypt.compareSync(password, data.password)) {
                    const token = jwt.sign({ id: data.id }, process.env.SECRET_TOKER);
                    Users.update({ token: token }, { where: { email: email } });

                    return {
                        success: true,
                        message: 'login successfully',
                        data: {
                            id: data.id,
                            name: data.name,
                            email: data.email,
                        },
                        token: token,
                    }
                } else {
                    return { data: null, success: false, message: 'password is invalid!', token: "" }
                }
            } else {
                return { data: null, success: false, message: 'email is invalid!', token: "" }
            }
        })
        .catch((error) => {
            return { data: null, success: false, message: 'Error: ' + error?.message, token: "" }
        });
};

exports.findByEmail = (email) => {
    return Users.findOne({ where: { email } }).then(ress => { return ress })
}

exports.register = async (name, email, password) => {
    try {
        const salt = await bcrypt.genSalt(10)
        const hash = await bcrypt.hash(password, salt)

        return Users.create({
            name: name,
            email: email,
            password: hash,
            token: ""
        }).then((data) => {
            if (data) {
                const token = jwt.sign({ id: data.id }, process.env.SECRET_TOKER);
                Users.update({ token: token }, { where: { email: email } });

                return {
                    success: true,
                    message: 'Register user successfully',
                    data: {
                        id: data.id,
                        name: data.name,
                        email: data.email,
                    },
                    token: token
                }
            } else {
                return {
                    data: null,
                    success: false,
                    message: 'Register failed!',
                    token: ""
                }
            }
        });

    } catch (error) {
        return {
            data: null,
            success: false,
            message: "Register failed:" + error?.message,
            token: ""
        }
    }
};