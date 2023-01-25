import React, {useState} from "react"
import {Form, Button, Alert} from "react-bootstrap";
import {Link} from "react-router-dom";
import {useForm} from 'react-hook-form'

const RegisterPage = () => {

    const {register, watch, handleSubmit, reset, formState: {errors}} = useForm()
    const [show, setShow] = useState(false)
    const [serverResponse, setServerResponse] = useState('')

    const submitForm = (data) => {

        if (data.password === data.confirmPassword) {

            const requestBody = {
                username: data.username,
                email: data.email,
                password: data.password
            }

            const requestOptions = {
                method: "POST",
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify(requestBody)
            }

            fetch('/authentication/sign_up', requestOptions)
                .then(res => res.json())
                .then(data => {
                    setServerResponse(data.message)
                    console.log(data)
                    setShow(true)
                })
                .catch(err => console.log(err))

            reset()
        } else {
            alert('Passwords do not match')
        }

    }

    return (
        <div className="containerCls">
            <div className="form">
                {show ?
                    <>
                        <h1>Please register</h1>
                        <Alert variant="success" onClose={() => setShow(false)} dismissible>
                            <Alert.Heading>Success</Alert.Heading>
                            <p>
                                {serverResponse}
                            </p>
                        </Alert>
                    </> :
                    <h1>Please register</h1>

                }
                <form>
                    <Form.Group>
                        <Form.Label>Username: </Form.Label>
                        <Form.Control type="text" placeholder="username"  data-testid="username-login"{...register("username", {
                            required: true,
                            maxLength: 30
                        })}/>
                    </Form.Group>
                    {errors.username && <p style={{color: "red"}} data-testid="username-required"><small>Username is required</small></p>}
                    {errors.username?.type === "maxLength" &&
                        <p style={{color: "red"}} data-testid="username-long"><small>Maximum character limit is 25</small></p>}
                    <br/>
                    <Form.Group>
                        <Form.Label>Email address: </Form.Label>
                        <Form.Control type="email" placeholder="email" data-testid="email-login" {...register("email", {
                            required: true,
                            maxLength: 100,
                        })}/>
                    </Form.Group>
                    {errors.email && <p style={{color: "red"}} data-testid="email-required"><small>Email required</small></p>}
                    {errors.email?.type === "maxLength" &&
                        <p style={{color: "red"}} data-testid="email-long"><small>Email too long - 100 characters max</small></p>}
                    <br/>
                    <Form.Group>
                        <Form.Label>Password: </Form.Label>
                        <Form.Control type="password" placeholder="password" data-testid="password-login" {...register("password", {
                            required: true,
                            minLength: 2
                        })}/>
                    </Form.Group>
                    {errors.password && <p style={{color: "red"}} data-testid="password-required"><small>Password required</small></p>}
                    {errors.password?.type === "minLength" &&
                        <p style={{color: "red"}} data-testid="password-short"><small>Password too short - 4 characters min</small></p>}
                    <br/>
                    <Form.Group>
                        <Form.Label>Confirm password: </Form.Label>
                        <Form.Control type="password" placeholder="password" data-testid="confirm-login" {...register("confirmPassword", {
                            required: true,
                            minLength: 2
                        })}/>
                    </Form.Group>
                    {errors.confirmPassword && <p style={{color: "red"}} data-testid="password-confirm"><small>Confirm pass is required</small></p>}
                    {errors.confirmPassword?.type === "minLength" &&
                        <p style={{color: "red"}}><small>Password too short - 4 characters min</small></p>}
                    <br/>
                    <Form.Group>
                        <Button as="sub" variant="primary" data-testid="register-btn" onClick={handleSubmit(submitForm)}>
                            Register
                        </Button>
                    </Form.Group>
                    <br/>
                    <Form.Group>
                        <small>Already created? <Link to="/login">Log in here</Link></small>
                    </Form.Group>
                </form>
            </div>
        </div>
    )
}

export default RegisterPage