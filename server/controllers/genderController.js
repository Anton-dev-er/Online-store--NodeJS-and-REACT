const ApiError = require("../error/ApiError");
const {Gender} = require("../models/models");
const uuid = require('uuid')
const path = require('path')

class GenderController {
  async create(req, res, next) {
    try {
      const {title} = req.body
      const {photo} = req.files
      const photoName = photo.name

      let fileName = uuid.v4() + '-' + photoName
      photo.mv(path.resolve(__dirname, '..', 'static', fileName))

      const gender = await Gender.create({title, photo: fileName})
      return res.json(gender)
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
      const gender = await Gender.findByPk(pk)
      if (!gender) {
        return next(ApiError.badRequest('Wrong pk'))
      }

      await gender.destroy()
      return res.json("Deleted Ok")
    } catch (e) {
      return res.json(e)
    }
  }

  async getAll(req, res) {
    return res.json(await Gender.findAll())
  }
}

module.exports = new GenderController()