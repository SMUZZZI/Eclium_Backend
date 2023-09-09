import { body } from 'express-validator'

export const registerValidation = [
    body("email").isEmail(),
    body("password").isLength({ min: 5 }),
    body("name").isLength({ min: 3 }),
];
export const loginValidation = [
    body("name").isLength({ min: 3 }),
    body("password").isLength({ min: 5 }),
];