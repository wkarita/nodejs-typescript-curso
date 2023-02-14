import { Router } from "express"

export const usersRoute = Router()

import { GetUsersController } from "@/controllers/get-users/get-users"
import { CreateUserController } from "@/controllers/create-user/create-user"
import { UpdateUserController } from "@/controllers/update-user/update-user"
import { MongoGetUsersRepository } from "@/repositories/get-users/mongo-get-users"
import { MongoCreateUserRepository } from "@/repositories/create-user/mongo-create-user"
import { MongoUpdateUserRepository } from "@/repositories/update-user/mongo-update-user"
import { MongoDeleteUserRepository } from "@/repositories/delete-user/mongo-delete-user"
import { DeleteUserController } from "@/controllers/delete-user/delete-user"

usersRoute.get("/users", async (req, res) => {
  const mongoGetUsersRepository = new MongoGetUsersRepository()
  const getUsersController = new GetUsersController(mongoGetUsersRepository)
  const { body, statusCode } = await getUsersController.handle()
  res.status(statusCode).send(body)
})

usersRoute.post("/users", async (req, res) => {
  const mongoCreateUserRepository = new MongoCreateUserRepository()
  const createUserController = new CreateUserController(
    mongoCreateUserRepository
  )
  const { body, statusCode } = await createUserController.handle({
    body: req.body,
  })
  res.status(statusCode).send(body)
})

usersRoute.patch("/users/:id", async (req, res) => {
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

usersRoute.delete("/users/:id", async (req, res) => {
  const mongoDeleteUserRepository = new MongoDeleteUserRepository()
  const deleteUserController = new DeleteUserController(
    mongoDeleteUserRepository
  )
  const { body, statusCode } = await deleteUserController.handle({
    params: req.params,
  })
  res.status(statusCode).send(body)
})
