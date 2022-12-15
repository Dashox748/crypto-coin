import {LoginFormTypes, LoginFormErrorTypes, RegisterFormErrorTypes, RegisterFormTypes} from "./interfaces";


export const isValidEmail = (email: string) => /\S+@\S+.\S+/.test(email);

export const validateLogin = (loginForm: LoginFormTypes) => {
    console.log(loginForm)
    let tempErrors: LoginFormErrorTypes = {} as LoginFormErrorTypes;
    tempErrors.email = loginForm?.email ? !isValidEmail(loginForm?.email) : true;
    tempErrors.password = loginForm?.password ? loginForm?.password.trim().length <= 4 : true;
    return tempErrors
}

export const validateRegister = (registerForm: RegisterFormTypes) => {
    console.log(registerForm)
    let tempErrors: RegisterFormErrorTypes = {} as RegisterFormErrorTypes;
    tempErrors.username = registerForm?.username ? registerForm?.username.trim().length < 3 : true;
    tempErrors.email = registerForm?.email ? !isValidEmail(registerForm?.email) : true;
    tempErrors.password = registerForm?.password ? registerForm?.password.trim().length <= 4 : true;
    return tempErrors
}