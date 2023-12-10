import React, { useEffect, useState } from 'react'
import "./PrivateRoute.css"

import { checkLoggedIn } from '../../SERVER/checkAuth' //function for sendig auth request to server
import { backendConfig } from '../../constants'
import { LoadingSpinner } from '../../elements'

const PrivateRoute = (props) => {

    const [isLoggedIn, setIsLoggedIn] = useState(null)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        if (isLoggedIn === null) return
        setTimeout(() => {
            //redirects to login if not logged in
            if (isLoggedIn.redirect) window.location = "/login"
            //renders the chat app if logged in
            if (!isLoggedIn.redirect) setIsLoading(false)
        }, 1000);
    }, [isLoggedIn])

    useEffect(() => {
        //checks if user is logged in
        checkLoggedIn(
            backendConfig.user.isLoggedIn.url,
            backendConfig.user.isLoggedIn.method,
            (result) => { setIsLoggedIn(result) }
        )
    }, [])

    if (!isLoading) {
        return props.children
    } else {
        //returns a loading page while checking user
        return (
           <div className='privateroute__overlay'>
                <h1>Chat wird geladen <LoadingSpinner /></h1>
           </div>
        )
    }
}

export default PrivateRoute
