const express = require('express')
const bcrypt = require('bcrypt')
const passport = require('passport')

const router = express.Router()
const User = require('../model/user')


router.post('/register', async (req, res) => {
    // console.log(req.body)
    const { name, username, password } = req.body

    if (!name || !username || !password) {
        return res.render('register', { message: 'Please entry again' })
    }

    const passwordHash = bcrypt.hashSync(password, 10)
    const user = new User({
        name,
        username,
        password: passwordHash
    })
    await user.save()
    res.render('index', { user })
})

router.post('/login', passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login-failed'

}), async (req, res) => {
    // console.log(req.body)
    const { username, password } = req.body
    res.redirect('/')

})

module.exports = router
