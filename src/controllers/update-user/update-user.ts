import { User } from "@/models/user"
import { badRequest, ok, serverError } from "../helpers"
import { HttpRequest, HttpResponse, IController } from "../protocols"
import { IUpdateUserParams, IUpdateUserRepository } from "./protocols"
export class UpdateUserController implements IController {
  constructor(private readonly updateUserRepository: IUpdateUserRepository) {}
  async handle(
    httpRequest: HttpRequest<IUpdateUserParams>
  ): Promise<HttpResponse<User | string>> {
    try {
      const id = httpRequest?.params?.id
      const body = httpRequest?.body

      if (!id) {
        return badRequest("Missing user id")
      }

      if (!body) {
        return badRequest("Missing user id")
      }

      const allowedFieldsToUpdate: (keyof IUpdateUserParams)[] = [
        "firstName",
        "lastName",
        "password",
      ]

      const someFieldIsNotAllowedToUpdate = Object.keys(body).some(
        (key) => !allowedFieldsToUpdate.includes(key as keyof IUpdateUserParams)
      )

      if (someFieldIsNotAllowedToUpdate) {
        return badRequest("Some received field is not allowed")
      }

      const user = await this.updateUserRepository.updateUser(id, body)

      return ok<User>(user)
    } catch (error) {
      return serverError()
    }
  }
}
