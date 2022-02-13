const Router = require('express')
const router = new Router()
const genderController = require('../controllers/genderController')
const checkRole = require("../middleware/checkRoleMiddleware");

router.post('/', checkRole('ADMIN'), genderController.create)
router.delete('/', checkRole('ADMIN'), genderController.delete)
router.get('/', genderController.getAll)

module.exports = router