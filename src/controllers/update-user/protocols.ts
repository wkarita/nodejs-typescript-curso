import { User } from "@/models/user"
import { HttpResponse, HttpRequest } from "../protocols"

export interface IUpdateUserParams {
  firstName?: string
  lastName?: string
  password?: string
}

export interface IUpdateUserController {
  handle(HttpRequest: HttpRequest<any>): Promise<HttpResponse<User>>
}

export interface IUpdateUserRepository {
  updateUser(id: string, params: IUpdateUserParams): Promise<User>
}
