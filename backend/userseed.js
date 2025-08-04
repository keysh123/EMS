const User = require('./models/userModel')
const bcrypt = require('bcrypt')

const userRegister = async () => {
    try{
        const hashedPassword = await bcrypt.hash('admin' , 10)
        const newUser = new User({
            name : 'admin',
            email : 'admin@gmail.com',
            password :hashedPassword,
            role : 'admin'
        })
        await newUser.save()

    }
    catch(err){
        console.log(err);
        
    }
}
module.exports = userRegister