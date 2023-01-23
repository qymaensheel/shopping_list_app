import 'bootstrap/dist/css/bootstrap.min.css'
import React from 'react'
import NavBar from "./components/Navbar"
import './styles/main.css'

import {
    BrowserRouter as Router,
    Routes,
    Route
} from 'react-router-dom'
import HomePage from "./components/home";
import LoginPage from "./components/Login";
import RegisterPage from "./components/Register";
import CreateList from "./components/CreateList";
import Login from "./components/Login";

const App=()=>{
    return (
        <Router>
            <NavBar/>
            <div className="containerCls container">
                <Routes>
                    <Route path="/createList" element={ <CreateList/>}>
                    </Route>
                    <Route path="/login" element={<LoginPage/>}>
                    </Route>
                    <Route path="/register" element={<RegisterPage/>}>
                    </Route>
                    <Route path="/" element={<HomePage/>}>
                    </Route>
                </Routes>
            </div>
        </Router>
    )
}

export default App
