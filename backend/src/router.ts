import { Router } from 'express'
import { body } from 'express-validator'
import { createAccount, getUser, getUserByHandle, login, searchByHandle, updateProfile, uploadImage } from './handlers'
import { handleInputErrors } from './middleware/validation'
import { authenticate } from './middleware/auth'

const router = Router()

/** Autenticacion y registro */
router.post(
  '/auth/register/',
  body('handle').notEmpty().withMessage('El handle puede ir vacio!!'),
  body('name').notEmpty().withMessage('Nombre de usuario no puede ir vacio!!'),
  body('email').isEmail().withMessage('Email no valido!!'),
  body('password').isLength({ min: 6 }).withMessage('El password debe ser de 6 caracteres o mas'),
  handleInputErrors,
  createAccount
)

router.post(
  '/auth/login',
  body('email').isEmail().withMessage('Email no valido!!'),
  body('password').notEmpty().withMessage('El password es obligatorio!!'),
  handleInputErrors,
  login
)

router.get('/user', authenticate, getUser)

router.patch('/user', body('handle').notEmpty().withMessage('El handle puede ir vacio!!'), handleInputErrors, authenticate, updateProfile)

router.post('/user/image', authenticate, handleInputErrors, uploadImage)

router.get('/:handle', getUserByHandle)

router.post('/search', body('handle').notEmpty().withMessage('El handle no puede ir vacio!!'), handleInputErrors, searchByHandle)

export default router
