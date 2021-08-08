/**
 * Define Database connection
 */

import * as mongoose from 'mongoose'
import { MongoError } from 'mongodb'
import Locals from './Locals'

export class Database {
  /**
   * Initialize your database pool
   */
  public static init(): any {
    const url = Locals.config().mongooseUrl
    const options = { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false }

    mongoose.connect(url, options, (error: MongoError) => {
      // handle the error case
      if (error) {
        console.error('Failed to connect to MongoDB')
        throw error
      } else {
        console.log(`Connected to mongo db at: ${url}`)
      }
    })
  }
}

export default mongoose
