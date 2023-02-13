import { body } from "express-validator";

export const loginValidation = [
    body('email', "Invalid email").isEmail(),
    body('password', "Invalid password").isLength({ min: 5 }),
]
export const registerValidation = [
    body('email', "Invalid email").isEmail(),
    body('password', "Invalid password").isLength({ min: 5 }),
    body('fullName', "Invalid Full Name").isLength({ min: 3 }),
    body('avatarUrl', "Invalid Avatar").optional().isURL(),
]
export const postCreateValidation = [
    body('title', "Invalid title").isLength({ min: 3 }).isString(),
    body('text', "Invalid text").isLength({ min: 10 }).isString(),
    body('tags', "Invalid tags").optional().isString(),
    body('imageUrl', "Invalid image").optional().isString(),
]
