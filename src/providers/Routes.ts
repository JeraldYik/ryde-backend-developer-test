/**
 * Define all routes
 */

import { Application } from 'express'
import Locals from './Locals'
import Router from './../routes'

class Routes {
  public static mountRoutes(_express: Application): Application {
    const apiPrefix = Locals.config().apiPrefix
    console.log('Routes :: Mounting API Routes...')

    return _express.use(`/${apiPrefix}`, Router)
  }
}

export default Routes
