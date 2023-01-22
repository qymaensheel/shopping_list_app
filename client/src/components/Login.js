import React, {useState} from "react"
import {Button, Form} from "react-bootstrap";
import {Link} from "react-router-dom";
import {useForm} from "react-hook-form";
import {login} from "../auth";
import {useNavigate} from 'react-router-dom'

const LoginPage = () => {

    const {register, handleSubmit, reset, formState: {errors}} = useForm()

    const navigate = useNavigate()

    const loginUser = (data) => {
        console.log(data)

        const requestOptions = {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(data)
        }

        fetch('/authentication/login',requestOptions)
            .then(res=>res.json())
            .then(data=>{
                console.log(data.access_token)
                login(data.access_token)
                navigate('/')
            })

        reset()

    }


    return (
        <div className="containerCls">
            <div className="form">
                <h1>Login to ShoppingApp</h1>
                <form>
                    <Form.Group>
                        <Form.Label>Username: </Form.Label>
                        <Form.Control type="text" placeholder="username"
                                      {...register('username', {required: true, maxLength: 30})}/>
                    </Form.Group>
                    {errors.username && <p style={{color: 'red'}}><small>Username is required</small></p>}
                    {errors.username?.type === "maxLength" &&
                        <p style={{color: 'red'}}><small>Username too long</small></p>}
                    <br/>
                    <Form.Group>
                        <Form.Label>Password: </Form.Label>
                        <Form.Control type="password" placeholder="password"
                                      {...register('password', {required: true, minLength: 2})}/>
                    </Form.Group>
                    {errors.password && <p style={{color: 'red'}}><small>Password is required</small></p>}
                    {errors.password?.type === "minLength" &&
                        <p style={{color: 'red'}}><small>Password too short</small></p>}
                    <br/>
                    <Form.Group>
                        <Button as="sub" variant="primary" onClick={handleSubmit(loginUser)}>
                            Log in
                        </Button>
                    </Form.Group>
                    <br/>
                    <Form.Group>
                        <small>New to ShoppingApp? <Link to="/register">Create account here</Link></small>
                    </Form.Group>
                </form>
            </div>
        </div>
    )
}

export default LoginPage