/**
 * Primary file for API Server
 */

import * as express from 'express'
import Locals from './Locals'
import Middlewares from '../middlewares'
import Routes from './Routes'
import Handler from '../handler/errorHandler'

class Express {
  /**
   * Create the express object
   */
  public express: express.Application

  /**
   * Initialise the express server
   * NOTE: Mount routes BEFORE handlers
   */
  constructor() {
    this.express = express()

    this.mountDotEnv()
    this.mountMiddlewares()
    this.mountRoutes()
    this.mountHandlers()
  }

  /**
   * Mount env variables
   */
  private mountDotEnv(): void {
    this.express = Locals.init(this.express)
  }

  /**
   * Mount all defined middlwares
   */
  private mountMiddlewares(): void {
    this.express = Middlewares.init(this.express)
  }

  /**
   * Mount handlers
   */
  private mountHandlers(): void {
    this.express = Handler.mount(this.express)
  }

  /**
   * Mount all defined routes
   */
  private mountRoutes(): void {
    this.express = Routes.mountRoutes(this.express)
  }

  /**
   * Starts the express server
   */
  public init(): void {
    const port: number = Locals.config().port
    const url: string = Locals.config().url

    try {
      this.express.listen(port, () => {
        console.log(`Server :: Running @ ${url}`)
      })
    } catch (err) {
      console.error(`Error: ${err.toString()}`)
    }
  }
}

/** Export a new Express module */
export default new Express()
