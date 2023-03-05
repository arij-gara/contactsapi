const { registeruser, loginuser, currentuser } = require("../controller/usercontroller")
const validateToken = require("../middleware/validatetokenhandler")

const router= require("express").Router()

//Register user
router.post('/register',registeruser)
//login
router.post('/login',loginuser)
//current
router.get('/current',validateToken,currentuser)

module.exports = router;