import { GetUsersController } from "./controllers/get-users/get-users"
import * as express from "express"
import { config } from "dotenv"
import { MongoGetUsersRepository } from "./repositories/get-users/mongo-get-users"
import { MongoClient } from "./database/mongo"

const main = async () => {
  config()

  const app = express()

  await MongoClient.connect()

  app.get("/users", async (req, res) => {
    const mongoGetUsersRepository = new MongoGetUsersRepository()
    const getUsersController = new GetUsersController(mongoGetUsersRepository)
    const { body, statusCode } = await getUsersController.handle()
    res.status(statusCode).send(body)
  })

  const port = process.env.PORT || 8000

  app.listen(port, () => console.log(`Listening on port ${port}!`))
}

main()
