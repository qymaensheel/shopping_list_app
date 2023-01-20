import React from 'react'
import {Link} from "react-router-dom";
import {useAuth} from "../auth";


const LoggedInHome = () => {
    return (
        <div className="containerCls">
            <h1>List of shopping lists</h1>
        </div>
    )
}

const LoggedOutHome = () => {
    return (
        <div className="containerCls">
            <h1 className="heading">ShoppingApp</h1>
            <br/>


            <Link to='/register' className="btn btn-primary btn-lg">Please register to continue</Link>
        </div>
    )
}

const HomePage = () => {
    const [logged] = useAuth()
    return (
        <div>
            {logged ? <LoggedInHome/> : <LoggedOutHome/>}
        </div>
    )
}

export default HomePage