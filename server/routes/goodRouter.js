const Router = require('express')
const router = new Router()
const goodController = require('../controllers/goodController')

router.post('/',goodController.create)
router.delete('/',goodController.delete)
router.get('/', goodController.getAll)
router.get('/:pk', goodController.getOne)

module.exports = router