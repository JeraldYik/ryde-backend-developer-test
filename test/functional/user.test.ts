/**
 * Users Functional tests (only happy paths)
 */

import { expect } from 'chai'
import { IUserModel } from '../../src/models/User'
import UserPayload from '../factory/userPayload'
import UserService from '../service/userService'

describe('User Functional Tests', () => {
  describe('/POST user', () => {
    let user: IUserModel

    it('Created user should return correct parameters', async () => {
      const userPayload = UserPayload.buildDefaultPayload()
      const response = await UserService.create(userPayload)

      expect(response.status, `Create User response should be successful`).to.be.equal(200) // response somehow returns 200 instead of 201
      expect(response.body.user, `Create User response should contain a user object`).to.be.not.empty

      user = response.body.user
      expect(user.name, `Created user name should match`).to.be.equal(userPayload.name)
      const date = new Date(user.dob)
      expect(date.getFullYear(), `Created User DOB year should match`).to.be.equal(userPayload.dobYear)
      expect(date.getMonth(), `Created User DOB month should match`).to.be.equal(userPayload.dobMonth - 1)
      expect(date.getDate(), `Created User DOB date should match`).to.be.equal(userPayload.dobDay)
      expect(user.address, `Created user address should match`).to.be.equal(userPayload.address)
      expect(user.description, `Created user description should match`).to.be.equal(userPayload.description)
    })

    after(async () => {
      if (user) {
        await UserService.delete(user._id)
      }
    })
  })

  describe('GET /user/:id', () => {
    let user: IUserModel

    before(async () => {
      const userPayload = UserPayload.buildDefaultPayload()
      user = (await UserService.create(userPayload)).body.user
    })

    it('Get user should return correct paramter', async () => {
      const userId = user._id
      const response = await UserService.get(userId)

      expect(response.status, `Get User response should be successful`).to.be.equal(200)
      expect(response.body.user, `Get User response should contain a user object`).to.be.not.empty

      user = response.body.user
      expect(user.name, `Get user name should not be empty`).to.be.not.empty
      expect(user.dob, `Get User DOB year should not be empty`).to.be.not.empty
      expect(user.address, `Get user address should not be empty`).to.be.not.empty
      expect(user.description, `Get user description should not be empty`).to.be.not.empty
    })

    after(async () => {
      if (user) {
        await UserService.delete(user._id)
      }
    })
  })

  describe('PATCH /user/:id', () => {
    let userPayload: UserPayload
    let user: IUserModel

    before(async () => {
      userPayload = UserPayload.buildDefaultPayload()
      user = (await UserService.create(userPayload)).body.user
    })

    it('Update user should return correct parameters', async () => {
      const newName = 'new name'
      const updatedPayload = UserPayload.updateName(userPayload, newName)
      const response = await UserService.update(user._id, updatedPayload)

      expect(response.status, `Create User response should be successful`).to.be.equal(200)
      expect(response.body.user, `Create User response should contain a user object`).to.be.not.empty

      user = response.body.user
      expect(user.name, `Updated user name should match`).to.be.equal(newName)
      const date = new Date(user.dob)
      expect(user.dob, `Get User DOB year should not be empty`).to.be.not.empty
      expect(user.address, `Get user address should not be empty`).to.be.not.empty
      expect(user.description, `Get user description should not be empty`).to.be.not.empty
    })

    after(async () => {
      if (user) {
        await UserService.delete(user._id)
      }
    })
  })

  describe('DELETE /user/:id', () => {
    let user: IUserModel

    before(async () => {
      const userPayload = UserPayload.buildDefaultPayload()
      user = (await UserService.create(userPayload)).body.user
    })

    it('Delete user should be processed properly', async () => {
      const response = await UserService.delete(user._id)
      expect(response.status, `Delete User response should be successful`).to.be.equal(204)

      const getResponse = await UserService.get(user._id)
      expect(getResponse.status, `Deleted User response should be a 404 error`).to.be.equal(404)
    })
  })
})
