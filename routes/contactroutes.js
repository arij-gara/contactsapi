const router = require('express').Router();
const {getcontacts,createcontact,getcontact,deletecontact, updatecontact} =  require('../controller/contactcontroller');
const validateToken = require('../middleware/validatetokenhandler');

router.use(validateToken)
//GET ALL CONTACTS
router.get("/", getcontacts)


//CREATE CONTACT
router.post("/", createcontact)

//GET one CONTACT 
router.get("/:id",getcontact)

//UPDATE CONTACT
router.put("/:id", updatecontact)

// DELETE CONTACT
router.delete("/:id", deletecontact)
module.exports = router;