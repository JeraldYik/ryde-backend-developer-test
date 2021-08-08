/**
 * Definition of application-wide Error Codes
 */

import IErrorCodes from '../interfaces/errorCodes'

const ErrorCodes: IErrorCodes = {
  user: {
    '400-0': 'Invalid fields',
    '400-1': 'User with input fields already exists',
    '404': 'User cannot be found'
  },
  general: {
    '404': 'Path not found'
  }
}

export default ErrorCodes
