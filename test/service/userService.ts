/**
 * User service methods for API calls for functional tests
 */

import * as request from 'supertest'
import { ICreateUserInput, IUpdateUserInput } from '../../src/routes/user/user.dto'

export default class UserService {
  private static readonly URL = 'localhost:8000/api/v1/'
  private static readonly ENDPOINT = 'user'

  public static async create(createUserInput: ICreateUserInput): Promise<request.Response> {
    return request(this.URL).post(this.ENDPOINT).send(createUserInput)
  }

  public static async get(userId: string): Promise<request.Response> {
    return request(this.URL).get(`${this.ENDPOINT}/${userId}`)
  }

  public static async update(userId: string, updateUserInput: IUpdateUserInput): Promise<request.Response> {
    return request(this.URL).patch(`${this.ENDPOINT}/${userId}`).send(updateUserInput)
  }

  public static async delete(userId: string): Promise<request.Response> {
    return request(this.URL).delete(`${this.ENDPOINT}/${userId}`)
  }
}
