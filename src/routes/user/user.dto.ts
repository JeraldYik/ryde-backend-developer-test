/**
 * Define DTO of User Request Body Inputs and Response Body Outputs
 */

import { IUserModel } from '../../models/User'

export interface ICreateUserInput {
  name: string
  dobYear: number
  dobMonth: number // 1-12 corresponding to month
  dobDay: number
  address: string
  description: string
}

export interface ICreateUserOutput {
  user: IUserModel
}

export interface IGetUserOutput {
  user: IUserModel
}

export interface IUpdateUserInput {
  name?: string
  dobYear?: number
  dobMonth?: number
  dobDate?: number
  address?: string
  description?: string
}

export interface IUpdateUserOutput {
  user: IUserModel
}
