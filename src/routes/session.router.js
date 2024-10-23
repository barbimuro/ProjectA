import { Router } from 'express'

import sessionController from '../controllers/session.controller.js'
import strategyPolicies from '../middlewares/passportAndPolicies.js'
import { passportCall } from '../middlewares/passportCall.js'


const router = Router()

router.post('/register', strategyPolicies('register', ['PUBLIC']),sessionController.passportRegister)

router.post('/login', strategyPolicies('login', ['PUBLIC']), sessionController.passportLogin)

router.get('github', strategyPolicies('github'), ['PUBLIC'])

router.get('/githubcallback', strategyPolicies('github'['PUBLIC']), sessionController.passportGitHubCallback)

router.get('/current', strategyPolicies('current',['PUBLIC']), sessionController.passportCallCurrent)

router.get('/logout', strategyPolicies(['PUBLIC']), sessionController.logout)

router.get('/failureRegister', strategyPolicies(['PUBLIC']), sessionController.failureRegister)

router.get('/failureLogin', strategyPolicies(['public']), sessionController.failureLogin)

export default router