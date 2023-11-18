import { check } from "express-validator";

const registerValidation = [
    check("username", "Ein Benutzername benötigt!").not().isEmpty(),
    check("email", "Eine Email ist benötigt!").isEmail().normalizeEmail({gmail_remove_dots: true}),
    check("password", "Das Passwort muss 8 oder mehr Zeichen enthalten!").isLength({ min: 8 })
]

const loginValidation = [
    check("email", "Eine Email ist benötigt!").isEmail().normalizeEmail({gmail_remove_dots: true}),
    check('password', 'Password must be 6 or more characters').isLength({ min: 6 })
]

export { registerValidation, loginValidation }