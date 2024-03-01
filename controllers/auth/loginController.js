const User = require('../../models/user')
const { comparePassword } = require('../../helpers/auth')
const jwt = require('jsonwebtoken')


exports.login = async (req, res) => {

    try {
        const { email, password } = req.body

        const user = await User.findOne({email})

        if (!user) {
            return res.status(400).json({
                'status': false,
                'message': 'No user with that email found',
            })
        }

        const passwordMatched = comparePassword(password, user.password)

        if (!passwordMatched) {
            return res.status(400).json({
                'status': false,
                'message': 'Email or password is incorrect',
            })
        }

        const token = jwt.sign({_id: user._id}, process.env.JWT_SECRET, {
            expiresIn: '7d'
        })

        user.password = undefined

        return res.status(200).json({
            'status': true,
            'message': "User has logged in successfully",
            user,
            token
        })

    } catch(err) {
        console.error('login user', err)
        return res.status(400).json({
            'status': false,
            'message': "Email or password is incorrect"
        })
    }
}