import mongoose from 'mongoose'
import colors from 'colors'

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI)
    console.log(colors.bold.cyan(`Mongoose conectado a ${mongoose.connection.host}:${mongoose.connection.port}`))
  } catch (error) {
    console.log(colors.red.bold(error.message))
    process.exit(1)
  }
}
