import type { Request, Response } from 'express'
import { validationResult } from 'express-validator'
import slug from 'slug'
import User from '../Models/User'
import { checkPassword, hashPassword } from '../utils/auth'

export const createAccount = async (req: Request, res: Response) => {
  const { email, password } = req.body

  const userExist = await User.findOne({ email })
  if (userExist) {
    const error = new Error('El correo propocionado ya esta registrado!!')
    return res.status(409).json({ error: error.message })
  }

  const handle = slug(req.body.handle, '')
  const handleExist = await User.findOne({ handle })
  if (handleExist) {
    const error = new Error('Nombre de usuario no disponible')
    return res.status(409).json({ error: error.message })
  }

  const user = new User(req.body)
  user.password = await hashPassword(password)
  user.handle = handle

  await user.save()
  res.status(201).send('Registro creado correctamente!!')
}

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body

  // Revisar si el usuario esta registrado
  const user = await User.findOne({ email })

  if (!user) {
    const error = new Error('El usuario no existe!!')
    return res.status(404).json({ error: error.message })
  }

  // Comprobar el password
  const validPassword = await checkPassword(password, user.password)

  if (!validPassword) {
    const error = new Error('Password incorrecto!!')
    return res.status(401).json({ error: error.message })
  }

  res.send('Autenticado!!')
}
