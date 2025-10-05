import colors from 'colors'
import server from './server'

const port = process.env.PORT || 4000

server.listen(4000, () => {
  console.log(colors.bold.blue(`Servidor funcionando en el puerto: ${port}`))
})
