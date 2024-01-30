import React, { useState } from 'react'
import { Link, Navigate } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

import "./LoginForm.css"
import Form from '../../components/Form/Form'

const BottomText = () => {
    return ( 
        <div className="app__login-register">
            <p>Haben Sie noch keinen Account? |</p>
            <Link to={`/registrieren`} className='link__to-register'>Registrieren</Link>
        </div>
    )
}

const LoginForm = (props) => {

    const [formData, setFormData] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const [emailError, setEmailError] = useState(false)
    const [passwordError, setPasswordError] = useState(false)
    const [loginSuccess, setLoginSuccess] = useState(false)
    const navigate = useNavigate()

    const hadleFormData = (prev, event) => {
        let value = event.target.value
        if (value === null) value = ""
        return {...prev, ...{[event.target.name]: value}}
    }

    const handleInput = (event) => {
        setFormData(prev => hadleFormData(prev, event))
    }

    const resetErrors = () => {
        setEmailError(false)
        setPasswordError(false)
    }

    const handleResponse = (res) => {
        setIsLoading(false)
        if (res.error) {
            if (res.message === "EMAIL_DOES_NOT_EXISTS")
                setEmailError(true)
            if (res.message === "PASSWORD_IS_INCORECT")
                setPasswordError(true)
            return
        }
        setLoginSuccess(true)
    }
    const handleSubmit = async(event) => {
        event.preventDefault()
        const headers = {
            "Accept": "application/json",
            "Content-Type": "application/json",
            "mode": "cors"
        }
        if (!isLoading) {
            resetErrors()
            try {
                setIsLoading(true)
                const res = await fetch(
                    "/api/user/login",
                    {
                        method: "POST",
                        headers: headers,
                        credentials: "include",
                        body: JSON.stringify(formData)
                    }
                )
                const resJson = await res.json()
                handleResponse(resJson)
            } catch (err) {}
        }
    }

    if (!loginSuccess) {
        return (
            <Form
                handleSubmit={handleSubmit}
                isLoading={isLoading}
                lastChild={<BottomText />}
            >
                <h1>Anmelden</h1>
                <div className="app__input-wrapper">
                    {emailError && <p>Email existiert nicht!</p>}
                    <input
                        placeholder='Email'
                        required type="email" name='email'
                        onChange={handleInput} id="login-email-input"
                    />
                </div>
                <div className='app__input-wrapper'>
                    {passwordError && <p>Passwort ist nicht richtig!</p>}
                    <input
                        required type="password"
                        placeholder='Passwort'
                        onChange={handleInput} name='password'
                    />
                </div>
            </Form>
        )
    } else { return <Navigate to={"/chat"} /> }
}
export default LoginForm