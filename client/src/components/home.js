import React, {useEffect, useState} from 'react'
import {Link} from "react-router-dom";
import {useAuth} from "../auth";
import ShoppingList from "./ShoppingList";


const LoggedInHome = () => {

    const [lists, setLists] = useState([])

    useEffect(
        () => {
            fetch('/shopping_list/shopping_lists')
                .then(res => res.json())
                .then(data => {
                    console.log(data)
                    setLists(data)
                })
                .catch(err => console.log(err))
        }, []
    )

    return (
        <div className="shopping_lists">
            {
                lists.map(
                    (list) => (
                        <ShoppingList title={list.title} items={list.items}/>
                    )
                )
            }
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