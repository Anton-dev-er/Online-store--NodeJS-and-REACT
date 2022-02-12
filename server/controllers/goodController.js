const uuid = require("uuid");
const path = require("path");
const ApiError = require("../error/ApiError");
const {Good, GoodInfo} = require("../models/models");

class GoodController {
  async create(req, res, next) {
    let {title, description, price, brandId, categoryId, good_info} = req.body
    const {photo} = req.files
    const photoName = photo.name
    let fileName = uuid.v4() + '-' + photoName
    photo.mv(path.resolve(__dirname, '..', 'static', fileName))

    if (!title || !description || !price || !brandId || !categoryId || !photo) {
      return next(ApiError.badRequest('The [title, description, price, brandId, categoryId, photo] fields is required'))
    }

    try {
      const good = await Good.create({title, description, price, brandId, categoryId, photo: fileName})

      if (good_info) {
        console.log("start");
        good_info = JSON.parse(good_info)
        good_info.forEach(i =>
            GoodInfo.create({
              title: i.title,
              description: i.description,
              goodId: good.id
            })
        )
      }

      return res.json(good)
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
      const good = await Good.findByPk(pk)
      if (!good) {
        return next(ApiError.badRequest('Wrong pk'))
      }

      await good.destroy()
      return res.json("Deleted Ok")
    } catch (e) {
      return res.json(e)
    }
  }

  async getAll(req, res) {
    let {brandId, categoryId, limit, page} = req.query
    page = page || 1
    limit = limit || 9
    let offset = page * limit - limit
    let goods;
    if (!brandId && !categoryId) {
      goods = await Good.findAndCountAll({limit, offset})
    }
    if (brandId && !categoryId) {
      goods = await Good.findAndCountAll({where: {brandId}, limit, offset})
    }
    if (!brandId && categoryId) {
      goods = await Good.findAndCountAll({where: {categoryId}, limit, offset})
    }
    if (brandId && categoryId) {
      goods = await Good.findAndCountAll({where: {categoryId, brandId}, limit, offset})
    }
    return res.json(goods)
  }

  async getOne(req, res) {
    const {pk} = req.params
    const good = await Good.findOne(
        {
          where: {id: pk},
          include: [{model: GoodInfo}]
        },
    )
    return res.json(good)
  }
}

module.exports = new GoodController()