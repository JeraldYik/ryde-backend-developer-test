/**
 * Define the error & exception handlers
 */

import { Application } from 'express'
import ErrorCodes from './errorCodes'
import { validationResult } from 'express-validator'

class Handler {
  public static mount(_express: Application): Application {
    _express.use(this.errorHandler)
    _express = this.notFoundHandler(_express)

    return _express
  }
  /**
   * Handles all the not found routes
   */
  private static notFoundHandler(_express: Application): Application {
    _express.use('*', (req, res) => {
      const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress

      console.error(`Path '${req.originalUrl}' not found [IP: '${ip}']!`)

      return res.status(404).json({
        errors: ErrorCodes.general['404']
      })
    })

    return _express
  }

  /**
   * Main error handler
   */
  public static errorHandler(err, req, res, next): any {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }

    console.error(err.stack)

    return res.status(500).json(err)
  }
}

export default Handler
