/**
 * Defines all the requisites in HTTP
 */

import * as cors from 'cors'
import { Application } from 'express'
import * as bodyParser from 'body-parser'

import Locals from '../providers/Locals'

class Http {
  public static mount(_express: Application): Application {
    console.log("Booting the 'HTTP' middleware...")

    // Enables the request body parser
    _express.use(
      bodyParser.json({
        limit: Locals.config().maxUploadLimit
      })
    )

    _express.use(
      bodyParser.urlencoded({
        limit: Locals.config().maxUploadLimit,
        parameterLimit: Locals.config().maxParameterLimit,
        extended: false
      })
    )

    // Disable the x-powered-by header in response
    _express.disable('x-powered-by')

    // Enables CORS
    _express.use(cors())

    return _express
  }
}

export default Http
