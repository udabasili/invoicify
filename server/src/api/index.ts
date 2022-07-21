import { Router } from "express"
import auth from "./routes/auth"
import client from "./routes/client"
import invoice from "./routes/invoice"
import privateRouteTest from "./routes/privateRouteTest"
import products from "./routes/products"
import project from "./routes/project"
import token from "./routes/token"
import user from "./routes/user"

export default () => {
    const app = Router()
    auth(app)
    privateRouteTest(app)
    user(app)
    token(app)
    client(app)
    project(app)
    invoice(app)
    products(app)
    return app
}