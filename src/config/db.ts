import mongoose from "mongoose";
import colors from 'colors'

export const conectDB = async () => {
  try {
    const conection = await mongoose.connect(process.env.DATABASE_URL)
    const url = `${ conection.connection.host }:${ conection.connection.port }`
    console.log(colors.white.bold(`Mongo conectado en ${url}`))
  } catch (error) {
    console.log(colors.red.bold('Error al conectar a MongoDB'))
    process.exit(1)
  }
}