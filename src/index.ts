import * as express from "express"
import { config } from "dotenv"
import { usersRoute } from "@/routes/users"

import { MongoClient } from "./database/mongo"

const main = async () => {
  config()

  const app = express()
  app.use(express.json())

  // routes
  app.use("/", usersRoute)

  await MongoClient.connect()

  const port = process.env.PORT || 8000
  app.listen(port, () => console.log(`Listening on port ${port}!`))
}

main()
