const {Brand} = require('../models/models')
const ApiError = require('../error/ApiError');

class BrandController {
  async create(req, res, next) {
    const {title} = req.body
    try {
      const brand = await Brand.create({title})
      return res.json(brand)
    } catch (e) {
      next(ApiError.badRequest(e.message))
    }

  }

  async delete(req, res, next) {
    const {pk} = req.body
    if (!pk) {
      return next(ApiError.badRequest('The [pk] field is required'))
    }

    try {
      const brand = await Brand.findByPk(pk)
      if (!brand) {
        return next(ApiError.badRequest('Wrong [pk]'))
      }

      await brand.destroy()
      return res.json("Deleted Ok")
    } catch (e) {
      next(ApiError.badRequest(e.message))
    }
  }

  async getAll(req, res) {
    return res.json(await Brand.findAll())
  }
}

module.exports = new BrandController()