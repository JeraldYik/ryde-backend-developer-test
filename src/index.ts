/**
 * Bootstrap App
 */

import { Database } from './providers/Database'
import Express from './providers/Express'

/**
 * Load Database
 */
Database.init()

/**
 * Load Server
 */
Express.init()
