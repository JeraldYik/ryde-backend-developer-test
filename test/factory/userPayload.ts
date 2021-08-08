/**
 * Class to Build User payload for functional tests
 */

import { ICreateUserInput } from '../../src/routes/user/user.dto'

export default class UserPayload implements ICreateUserInput {
  public name: string
  public dobYear: number
  public dobMonth: number
  public dobDay: number
  public address: string
  public description: string

  constructor(name: string, dobYear: number, dobMonth: number, dobDay: number, address: string, description: string) {
    this.name = name
    this.dobYear = dobYear
    this.dobMonth = dobMonth
    this.dobDay = dobDay
    this.address = address
    this.description = description
  }

  public static buildDefaultPayload(): UserPayload {
    const TIMESTAMP = Date.now().toString(16).toUpperCase()
    const _name = `test-name-${TIMESTAMP}`
    /** 2000 1 Jan */
    const _dobYear = 2000
    const _dobMonth = 1
    const _dobDay = 1
    const _address = `test-address-${TIMESTAMP}`
    const _description = `test-description-${TIMESTAMP}`
    return new UserPayload(_name, _dobYear, _dobMonth, _dobDay, _address, _description)
  }

  public static updateName(payload: UserPayload, newName: string): UserPayload {
    const updatedPayload = { ...payload, name: newName }
    return updatedPayload
  }
}
