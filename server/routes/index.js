const Router = require('express')
const router = new Router()
const brandRouter = require('./brandRouter')
const categoryRouter = require('./categoryRouter')
const genderRouter = require('./genderRouter')
const goodRouter = require('./goodRouter')
const userRouter = require('./userRouter')

router.use('/brand', brandRouter)
router.use('/category', categoryRouter)
router.use('/gender', genderRouter)
router.use('/good', goodRouter)
router.use('/user', userRouter)

module.exports = router