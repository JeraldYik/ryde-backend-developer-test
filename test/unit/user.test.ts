/**
 * Users Unit tests (only happy paths)
 */

import { expect } from 'chai'
import { IUserModel } from 'src/models/User'
import createDateObject from '../../src/helper/createDateObject'
import IUser from '../../src/interfaces/models/user'
import UserController from '../../src/routes/user/user.controller'
import { Database } from '../../src/providers/Database'

describe('User Unit tests from user.controller.ts', () => {
  let fields: IUser
  let user: IUserModel

  before(() => {
    Database.init()
    const TIMESTAMP = Date.now().toString(16).toUpperCase()
    fields = {
      name: `test-name-${TIMESTAMP}`,
      dob: createDateObject(2000, 1, 1),
      address: `test-address-${TIMESTAMP}`,
      description: `test-description-${TIMESTAMP}`
    }
  })

  it('createDateObject', () => {
    // 2000 Jan 1
    const year = 2000
    const month = 1
    const day = 1
    const dateObject = createDateObject(year, month, day)
    expect(dateObject.getFullYear(), 'Year should match').to.be.eql(year)
    expect(dateObject.getMonth() + 1, 'Month should match').to.be.eql(month)
    expect(dateObject.getDate(), 'Day should match').to.be.eql(day)
  })

  it('createUser', async () => {
    const _user = await UserController.createUser(fields)
    user = _user
    expect(_user, 'User should be returned').to.not.be.empty
    expect(_user._id, 'User should have a userId').to.not.be.empty
  })

  it('getUserById', async () => {
    const _user = await UserController.getUserById(user._id)
    expect(_user, 'User should be returned').to.not.be.empty
    expect(_user._id, 'User Id should match').to.be.eql(user._id)
    expect(_user.name, 'User name should match').to.be.eql(fields.name)
    expect(_user.dob, 'User DOB should match').to.be.eql(fields.dob)
    expect(_user.address, 'User address should match').to.be.eql(fields.address)
    expect(_user.description, 'User description should match').to.be.eql(fields.description)
  })

  it('getUserByFields', async () => {
    const _user = await UserController.getUserByFields(fields)
    expect(_user, 'User should be returned').to.not.be.empty
    expect(_user._id, 'User Id should match').to.be.eql(_user._id)
    expect(_user.name, 'User name should match').to.be.eql(fields.name)
    expect(_user.dob, 'User DOB should match').to.be.eql(fields.dob)
    expect(_user.address, 'User address should match').to.be.eql(fields.address)
    expect(_user.description, 'User description should match').to.be.eql(fields.description)
  })

  it('updateUserById (update address)', async () => {
    const TIMESTAMP = Date.now().toString(16).toUpperCase()
    const updateFields = {
      address: `new-test-address-${TIMESTAMP}`
    }
    const _user = await UserController.updateUserById(user._id, updateFields, user)
    expect(_user, 'User should be returned').to.not.be.empty
    expect(_user._id, 'User Id should match').to.be.eql(_user._id)
    expect(_user.name, 'User name should match').to.be.eql(fields.name)
    expect(_user.dob, 'User DOB should match').to.be.eql(fields.dob)
    expect(_user.address, 'User address should be updated').to.be.eql(updateFields.address)
    expect(_user.description, 'User description should match').to.be.eql(fields.description)
  })

  it('deleteUserById', async () => {
    await UserController.deleteUserById(user._id)
    const deletedUser = await UserController.getUserById(user._id)
    expect(deletedUser, 'Deleted user should not be found').to.not.exist
  })
})
