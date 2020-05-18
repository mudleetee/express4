var express = require('express')
var router = express.Router()

// const isLoggedIn = (req, res, next) => {
//   if (!req.session.user) {
//     return res.redirect('/login')
//   }
//   next()
// }
const isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) {
    next()
  } else {
    res.redirect('/login')
  }
}

/* GET home page. */
router.get('/', isLoggedIn, function (req, res, next) {
  res.render('index', { title: 'Express', user: req.user })
})

router.get('/register', (req, res) => {
  res.render('register')
})


router.get('/login', (req, res) => {
  // res.render('login', { message: `${req.session.user} has log in already.` })
  res.render('login')
})

router.get('/logout', (req, res) => {
  // res.render('login', { message: `${req.session.user} has log in already.` })
  req.logout()
  res.redirect('/')
})


module.exports = router
