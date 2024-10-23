import { Router } from 'express'

import { logger } from '../utils/errors/logger.js'
import sessionController from '../controllers/session.controller.js'
import strategyPolicies from '../middlewares/passportAndPolicies.js'
import { passportCall } from '../middlewares/passportCall.js'
import { executePolicies } from '../middlewares/policies.js'


const router = Router()

router.post('/register', strategyPolicies('register',['PUBLIC']),sessionController.passportRegister)

router.post('/login', strategyPolicies('login', ['PUBLIC']), sessionController.passportLogin)

router.get('/github', strategyPolicies('github', ['PUBLIC']))

router.get('/githubcallback', strategyPolicies('github'['PUBLIC']), sessionController.passportGitHubCallback)

router.get('/current', strategyPolicies('current',['PUBLIC']), sessionController.passportCallCurrent)

router.get('/logout', strategyPolicies(null, ['PUBLIC']), sessionController.logout)

router.get('/failureRegister', strategyPolicies(null, ['PUBLIC']), sessionController.failureRegister)

router.get('/failureLogin', strategyPolicies(null, ['public']), sessionController.failureLogin)

export default router