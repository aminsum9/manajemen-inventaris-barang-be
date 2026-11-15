const userRepository = require('../repositories/user');

exports.login = async (email, password) => {
    const ress = await userRepository.login(email,password)

    return ress
}