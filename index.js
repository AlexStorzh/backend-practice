import express from "express";
import mongoose from "mongoose";
import { registerValidation, loginValidation, postCreateValidation } from './Validations.js'
import checkAuth from "./utils/checkAuth.js";
import * as UserController from "./controlers/UserController.js";
import * as PostController from './controlers/PostController.js'



mongoose.connect('mongodb+srv://admin:wwwwww@cluster0.4pthlhy.mongodb.net/blog?retryWrites=true&w=majority').then(() => console.log('DB ok'))
    .catch((err) => console.log('DB err', err))

const app = express()

app.use(express.json())

app.post('/auth/login', loginValidation, UserController.login)
app.post('/auth/register', registerValidation, UserController.register)
app.get('/auth/me', checkAuth, UserController.getMe)



app.get('/posts', PostController.getAll)
app.get('/posts/:id', PostController.getOne)
app.post('/posts', checkAuth, postCreateValidation, PostController.create)
app.patch('/posts/:id', checkAuth, PostController.update)
app.delete('/posts/:id', checkAuth, PostController.remove)

app.listen(4000, (err) => {
    if (err) {
        return console.log(err);
    }
    console.log('ServerStarted');
})