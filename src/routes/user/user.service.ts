/**
 * Define User Service methods
 */

import { Request, Response, NextFunction } from 'express'
import UserController from './user.controller'
import { ICreateUserInput, ICreateUserOutput, IGetUserOutput, IUpdateUserOutput } from './user.dto'
import IUser from '../../interfaces/models/user'
import ErrorCodes from '../../handler/errorCodes'
import createDateObject from '../../helper/createDateObject'
import { invalidDay, invalidMonth, notValidObjectIdFormat } from '../../helper/formatStrings'
import checkObjectId from '../../helper/checkObjectId'
import checkValidMonth from '../../helper/checkValidMonth'
import checkValidDay from '../../helper/checkValidDay'

class UserService {
  /**
   * Exposed POST User service method
   */
  public static async create(req: Request, res: Response, next: NextFunction): Promise<Response> {
    const reqBody: ICreateUserInput = req.body
    const name: string = reqBody.name
    const dobYear: number = reqBody.dobYear
    const dobMonth: number = reqBody.dobMonth
    const dobDay: number = reqBody.dobDay
    const address: string = reqBody.address
    const description: string = reqBody.description

    /**
     * NOTE: I've tried to add this check to express-validator by calling .custom(). errorHandler() couldn't catch this error
     * docs: https://express-validator.github.io/docs/custom-validators-sanitizers.html
     */
    if (!checkValidMonth(dobMonth)) {
      return res.status(400).json({
        errors: invalidMonth()
      })
    }
    if (!checkValidDay(dobDay)) {
      return res.status(400).json({
        errors: invalidDay()
      })
    }

    try {
      const date = createDateObject(dobYear, dobMonth, dobDay)
      console.log({ date })
      const fields: IUser = {
        name,
        dob: date,
        address,
        description
      }

      const existingUser = await UserController.getUserByFields(fields)
      if (existingUser) {
        return res.status(400).json({
          errors: ErrorCodes.user['400-1']
        })
      }

      const user = await UserController.createUser(fields)
      const response: ICreateUserOutput = {
        user
      }
      return res.status(201).json(response)
    } catch (err) {
      next(err)
    }
  }

  /**
   * Exposed GET User service method
   */
  public static async get(req: Request, res: Response, next: NextFunction): Promise<Response> {
    const userId: string = req.params.id
    if (!checkObjectId(userId)) {
      return res.status(400).json({
        errors: notValidObjectIdFormat(userId)
      })
    }

    try {
      const user = await UserController.getUserById(userId)
      if (!user) {
        return res.status(404).json({
          errors: ErrorCodes.user['404']
        })
      }

      const response: IGetUserOutput = {
        user
      }
      return res.status(200).json(response)
    } catch (err) {
      next(err)
    }
  }

  /**
   * Exposed PATCH User service method
   */
  public static async update(req: Request, res: Response, next: NextFunction): Promise<Response> {
    const reqBody: ICreateUserInput = req.body
    const userId: string = req.params.id
    const name: string = reqBody.name
    const dobYear: number = reqBody.dobYear
    const dobMonth: number = reqBody.dobMonth
    const dobDay: number = reqBody.dobDay
    const address: string = reqBody.address
    const description: string = reqBody.description

    if (dobMonth !== undefined && !checkValidMonth(dobMonth)) {
      return res.status(400).json({
        errors: invalidMonth()
      })
    }
    if (dobDay !== undefined && !checkValidDay(dobDay)) {
      return res.status(400).json({
        errors: invalidDay()
      })
    }
    if (!checkObjectId(userId)) {
      return res.status(400).json({
        errors: notValidObjectIdFormat(userId)
      })
    }

    try {
      const updatingUser = await UserController.getUserById(userId)
      if (!updatingUser) {
        return res.status(404).json({
          errors: ErrorCodes.user['404']
        })
      }

      const date = dobYear !== undefined && dobMonth !== undefined && dobDay !== undefined && createDateObject(dobYear, dobMonth, dobDay)
      const fields: IUser = {
        name,
        dob: date,
        address,
        description
      }
      const existingUser = await UserController.getUserByFields(fields)
      if (existingUser) {
        return res.status(400).json({
          errors: ErrorCodes.user['400-1']
        })
      }

      const updatedUser = await UserController.updateUserById(userId, fields, updatingUser)
      const response: IUpdateUserOutput = {
        user: updatedUser
      }
      return res.status(200).json(response)
    } catch (err) {
      next(err)
    }
  }

  /**
   * Exposed DELETE User service method
   */
  public static async delete(req: Request, res: Response, next: NextFunction): Promise<Response> {
    const userId: string = req.params.id
    if (!checkObjectId(userId)) {
      return res.status(400).json({
        errors: notValidObjectIdFormat(userId)
      })
    }

    try {
      const deletedUser = await UserController.deleteUserById(userId)
      if (!deletedUser) {
        return res.status(404).json({
          errors: ErrorCodes.user['404']
        })
      }
      return res.status(204).send()
    } catch (err) {
      next(err)
    }
  }
}

export default UserService
