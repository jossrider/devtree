import type { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import User, { IUser } from '../Models/User'

declare global {
  namespace Express{
    interface Request {
      user?: IUser
    }
  }
}

export const authenticate = async (req: Request, res: Response, next: NextFunction) => {
  const bearer = req.headers.authorization
  if (!bearer) {
    const error = new Error('No Autorizado!!')
    return res.status(401).json({ error: error.message })
  }
  const [, token] = bearer.split(' ')

  if (!token) {
    const error = new Error('No Autorizado!!')
    return res.status(401).json({ error: error.message })
  }

  try {
    const result = jwt.verify(token, process.env.JWT_SECRET)
    if (typeof result === 'object' && result.id) {
      const user = await User.findById(result.id, { password: false })
      if (!user) {
        const error = new Error('El usuario no existe!!')
        return res.status(404).json({ error: error.message })
      }
      req.user = user
      return next()
    }
  } catch (error) {
    res.status(500).json({ error: 'Token no Válido!!' })
  }
}
