const express = require('express')

//controller functions
const {loginUser , signupUser , addfav , dltfav}= require('../controllers/userController')
const router = express.Router()


//login route
router.post('/login',loginUser)


//signup route
router.post('/signup',signupUser)

//add fav routes
router.post('/fav/add' , addfav)

//remove fav routes
router.post('/fav/dlt' , dltfav)

module.exports = router