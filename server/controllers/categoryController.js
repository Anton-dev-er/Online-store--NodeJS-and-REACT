const {Category, Brand} = require("../models/models");
const ApiError = require("../error/ApiError");

class CategoryController {
  async create(req, res, next) {
    const {title, genderId} = req.body

    if (!genderId || !title) {
      return next(ApiError.badRequest('The [genderId, title] fields is required'))
    }

    try {
      const cat = await Category.create({title, genderId})
      return res.json(cat)
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
      const cat = await Category.findByPk(pk)
      if (!cat) {
        return next(ApiError.badRequest('Wrong [pk]'))
      }

      await cat.destroy()
      return res.json("Deleted Ok")
    } catch (e) {
      next(ApiError.badRequest(e.message))
    }
  }

  async getAll(req, res) {
    return res.json(await Category.findAll())
  }
}

module.exports = new CategoryController()