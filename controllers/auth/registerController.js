const User = require('../../models/user')
const { hashPassword } = require('../../helpers/auth')

exports.register = async (req, res) => {
    const { name, email, password } = req.body

    const hashedPassword = await hashPassword(password)

    const exists = await User.findOne({email})

    if (exists) {
        console.error('Register email already exists')
        return res.status(400).json({
            "errors": {
                "email": {
                    "name": "ValidatorError",
                    "message": "Email already exists.",
                    "properties": {
                        "message": "Email already exists.",
                        "type": "unique",
                        "path": "email"
                    },
                    "kind": "unique",
                    "path": "email"
                }
            }
        })
    }

    const user = new User({ name, email, password: hashedPassword })

    let error = user.validateSync()

    if (error) {
        console.error('Registering a new user', error.errors)
        return res.status(400).json({
            'errors': error.errors
        })
    }
    
    try {
        await user.save()
        return res.status(201).json({
            'status': true,
            user
        })
    } catch(err) {
        console.error('Registering a new user', err.errors)
        return res.status(400).json({
            'errors': err.errors
        })
    }
}