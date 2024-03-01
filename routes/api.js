const express = require('express')
const registerController = require('../controllers/auth/registerController')
const loginController = require('../controllers/auth/loginController')
const User = require('../models/user')

//middleware
const { verifyToken } = require('../middlewares/verifyJwtToken')

const router = express.Router()

router.get('/current-user', verifyToken, async (req, res) => {
    try {
        const user = await User.findById(req.auth._id)
        user.password = undefined
        return res.sendStatus(200)
    } catch(err) {
        console.error('User token is unauthorized', err)
        return res.sendStatus(401)
    }
})

router.post('/register', registerController.register)
router.post('/login', loginController.login)

module.exports = router