/**
 * Define CORS middleware
 */

import * as cors from 'cors'
import { Application } from 'express'

import Locals from '../providers/Locals'

class CORS {
  public mount(_express: Application): Application {
    console.log("Booting the 'CORS' middleware...")

    const options = {
      origin: Locals.config().url,
      optionsSuccessStatus: 200
    }

    _express.use(cors(options))

    return _express
  }
}

export default new CORS()
