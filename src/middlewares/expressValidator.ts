/**
 * Define request body tests using express-validator
 * NOTE: not all tests are defined here, but in the service class itself
 */

import { body } from 'express-validator'
import { fieldIsEmpty } from '../helper/formatStrings'

export const UserValidator = {
  create: [
    body('name', fieldIsEmpty('Name')).notEmpty(),
    body('dobYear', fieldIsEmpty('Year')).notEmpty(),
    body('dobMonth', fieldIsEmpty('Month')).notEmpty(),
    body('dobDay', fieldIsEmpty('Day')).notEmpty(),
    body('address', fieldIsEmpty('Address')).notEmpty(),
    body('description', fieldIsEmpty('Description')).notEmpty()
  ]
}
