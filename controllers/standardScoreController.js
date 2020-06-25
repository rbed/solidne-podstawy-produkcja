const standardScoreServices = require('../services/standardScoreServices')
const HTTP_STATUS = require('http-status-codes')
const logger = require('../modules/logger/logger')
const ErrorHandeler = require('../modules/ErrorHandeler/ErrorHandeler')
const AppError = require('../modules/ErrorHandeler/AppError')

const {ARGUMENT_ERROR, MONGO_ERROR} = AppError.APP_ERRORS


class standardScoreController {
  static async getAll(req, res, err) {
    try {
      const {id} = req.query
      const data = await standardScoreServices.getAll(id)
      return res.status(HTTP_STATUS.OK).json(data)
    }
    catch (err) {
      return  ErrorHandeler.handle(req, res, err)
    }
    
  }

  /**
   * @async
   */
  //
  static async create(req, res, err) {
    const {body: { score }} = req;
    if (!score) {
      return ErrorHandeler.handle(req, res, new AppError('nie podales adresu', ARGUMENT_ERROR)) 
    }
    try {
      const data = await standardScoreServices.create(score)
      return res.status(HTTP_STATUS.OK).json(data)

    } 
    catch(err) {
      ErrorHandeler.handle(req, res, err)
    }
  }

  /**
   * @async
   */
  //
  static async addMany(req, res, err) {
    const {body: { scores }} = req;
    if (!scores) {
      return ErrorHandeler.handle(req, res, new AppError('nie podales adresów', ARGUMENT_ERROR)) 
    }
    try {
      const data = await standardScoreServices.createMany(scores)
      return res.status(HTTP_STATUS.OK).json(data)

    } 
    catch(err) {
      ErrorHandeler.handle(req, res, err)
    }
  }


  /**
   * @async
   */

  static async update(req, res, err) {
    const {body: { score }} = req;
    if (!score) {
        // return res.status(400).send('nie podałeś co chcesz zmmienic')
        return ErrorHandeler.handle(req, res, new AppError('nie podales adresu jaki chcesz zmienic', ARGUMENT_ERROR))  
    }
    try {
      const data = await standardScoreServices.update(score)
      return res.status(HTTP_STATUS.OK).json(data)
    }
    catch(err) {
      ErrorHandeler.handle(req, res, err)
    }
  }



  static async removeByID(req, res, err) {
    const id = (req.query.id) 
    if (!id) {
      return ErrorHandeler.handle(req, res, new AppError('nie podałes id', ARGUMENT_ERROR))  
    }
    try {
      const data = await standardScoreServices.delete(id)
      return res.status(HTTP_STATUS.OK).json({data, deleted: true})
    }
    catch(err) {
      return ErrorHandeler.handle(req, res, err)  
    }
  }
}

module.exports = standardScoreController;
