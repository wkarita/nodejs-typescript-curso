import { GetUsersController } from "./controllers/get-users/get-users"
import { CreateUserController } from "./controllers/create-user/create-user"
import { UpdateUserController } from "./controllers/update-user/update-user"
import * as express from "express"
import { config } from "dotenv"
import { MongoGetUsersRepository } from "./repositories/get-users/mongo-get-users"
import { MongoCreateUserRepository } from "./repositories/create-user/mongo-create-user"
import { MongoUpdateUserRepository } from "./repositories/update-user/mongo-update-user"
import { MongoClient } from "./database/mongo"

const main = async () => {
  config()

  const app = express()

  app.use(express.json())

  await MongoClient.connect()

  app.get("/users", async (req, res) => {
    const mongoGetUsersRepository = new MongoGetUsersRepository()
    const getUsersController = new GetUsersController(mongoGetUsersRepository)
    const { body, statusCode } = await getUsersController.handle()
    res.status(statusCode).send(body)
  })

  app.post("/users", async (req, res) => {
    const mongoCreateUserRepository = new MongoCreateUserRepository()
    const createUserController = new CreateUserController(
      mongoCreateUserRepository
    )
    const { body, statusCode } = await createUserController.handle({
      body: req.body,
    })
    res.status(statusCode).send(body)
  })

  app.patch("/users/:id", async (req, res) => {
    const mongoUpdateUserRepository = new MongoUpdateUserRepository()
    const updateUserController = new UpdateUserController(
      mongoUpdateUserRepository
    )
    const { body, statusCode } = await updateUserController.handle({
      body: req.body,
      params: req.params,
    })
    res.status(statusCode).send(body)
  })

  const port = process.env.PORT || 8000

  app.listen(port, () => console.log(`Listening on port ${port}!`))
}

main()
