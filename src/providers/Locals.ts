/**
 * Define App Locals & Configs
 */

import * as path from 'path'
import * as dotenv from 'dotenv'
import { Application } from 'express'

class Locals {
  /**
   * Makes env configs available throughout the app's runtime
   */
  public static config(): any {
    dotenv.config({ path: path.join(__dirname, '../../.env') })

    return {
      port: process.env.PORT || 8000,
      url: `${process.env.APP_URL}:${process.env.PORT}` || 'localhost:8000',
      name: process.env.APP_NAME || 'Ryde Backend Developer Test',
      apiPrefix: process.env.API_PREFIX || 'api/v1',
      mongooseUrl: process.env.MONGOOSE_URL || 'mongodb://127.0.0.1:27017/ryde',

      isCORSEnabled: process.env.CORS_ENABLED || true,
      maxUploadLimit: process.env.APP_MAX_UPLOAD_LIMIT || '50mb',
      maxParameterLimit: process.env.APP_MAX_PARAMETER_LIMIT || 5000
    }
  }

  /**
   * Injects your config to the app's locals
   */
  public static init(_express: Application): Application {
    _express.locals.app = this.config()
    return _express
  }
}

export default Locals
