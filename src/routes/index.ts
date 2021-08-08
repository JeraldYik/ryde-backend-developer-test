/**
 * Define all your API routes
 */

import { Router } from 'express'
import Locals from '../providers/Locals'

import UserService from './user/user.service'
import { UserValidator } from '../middlewares/expressValidator'

const router = Router()

/** Test route */
router.get('/', (req, res, next) => {
  return res.status(200).json({ message: `Welcome to ${Locals.config().name}` })
})

/** User routes */
router.post('/user', [...UserValidator.create], UserService.create)
router.get('/user/:id', UserService.get)
router.patch('/user/:id', UserService.update)
router.delete('/user/:id', UserService.delete)

export default router
