const userRepository = require('../repositories/user');

exports.login = async (email, password) => {
    const ress = await userRepository.login(email,password)

    return ress
}

exports.register = async (name, email, password) => {
    const findByEmail = await userRepository.findByEmail(email)

    if(findByEmail){
        return {data: null, message: "Email already used!", success: false}
    }

    const ress = await userRepository.register(name,email,password)

    return ress
}