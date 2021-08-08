/**
 * Define User Controller methods
 */

import User, { IUserModel } from '../../models/User'
import IUser from '../../interfaces/models/user'
import IMongoDBId from '../../interfaces/id'

class UserController {
  public static async createUser(fields: IUser): Promise<IUserModel> {
    const newUser = new User({ ...fields })
    await newUser.save()

    return newUser
  }

  public static async getUserById(userId: string): Promise<IUserModel> {
    return await this.getUser({ _id: userId })
  }

  public static async getUserByFields(fields: IUser): Promise<IUserModel> {
    return await this.getUser(fields)
  }

  private static async getUser(params: IUser | IMongoDBId): Promise<IUserModel> {
    return await User.findOne(params)
  }

  public static async updateUserById(userId: string, fields: Partial<IUser>, updatingUser: IUserModel): Promise<IUserModel> {
    const updateFields: IUser = {
      name: fields.name ?? updatingUser.name,
      dob: fields.dob ?? updatingUser.dob,
      address: fields.address ?? updatingUser.address,
      description: fields.description ?? updatingUser.description
    }

    return await User.findOneAndUpdate({ _id: userId }, updateFields, { new: true })
  }

  public static async deleteUserById(userId: string): Promise<IUserModel> {
    return await User.findOneAndDelete({ _id: userId })
  }
}

export default UserController
