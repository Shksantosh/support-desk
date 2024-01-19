const asyncHandler = require('express-async-handler')

// @Description Register a new user
// @Route /api/users
// @acess Public
const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password} = req.body
    
    // Validation
    if (!name || !email || !password) {
        res.status(400)
        throw new Error('Please include all fields')
    }
    res.send('Register Route')
})

// @Description Login a user
// @Route /api/users/login 
// @acess Public
const loginUser = asyncHandler(async (req, res) => {
    res.send('Login Route')
})

module.exports = {
    registerUser,
    loginUser
}