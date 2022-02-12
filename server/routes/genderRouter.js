const Router = require('express')
const router = new Router()
const genderController = require('../controllers/genderController')

router.post('/', genderController.create)
router.delete('/', genderController.delete)
router.get('/', genderController.getAll)

module.exports = router