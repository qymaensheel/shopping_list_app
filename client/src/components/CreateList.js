import React, {useState} from "react"
import {Form, Button, Alert} from "react-bootstrap";
import {useForm} from "react-hook-form";

const CreateList = () => {

    const {register, handleSubmit, reset, formState: {errors}} = useForm()
    const [show, setShow] = useState(false)
    const [serverResponse, setServerResponse] = useState('')

    const createList = (data) => {
        console.log(data)


        const token = localStorage.getItem('REACT_TOKEN_AUTH_KEY')
        console.log(token)

        const requestOptions = {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                'Authorization': `Bearer ${JSON.parse(token)}`
            },
            body: JSON.stringify(data)
        }

        fetch('/shopping_list/shopping_lists', requestOptions)
            .then(res => res.json())
            .then(data => {
                console.log(data)
                setServerResponse(data.message)
                setShow(true)
                reset()
            })
            .catch(err => console.log(err))

    }

    return (
        <div className="container">
            {show ?
                <>
                    <h1 data-testid="create-header">Create shopping list</h1>
                    <Alert variant="success" onClose={() => setShow(false)} dismissible>
                        <Alert.Heading>Success</Alert.Heading>
                        <p>
                            {serverResponse}
                        </p>
                    </Alert>
                </> :
                <h1 data-testid="create-header">Create shopping list</h1>

            }
            <Form>
                <Form.Group>
                    <Form.Label data-testid="create-form-title">Title</Form.Label>
                    <Form.Control type="text" data-testid="create-form-title-field"
                                  {...register('title', {required: true, maxLength: 30})}/>

                </Form.Group>
                {errors.title && <p style={{color: "red"}}><small>Title is required</small></p>}
                {errors.title?.type === "maxLength" &&
                    <p style={{color: "red"}}><small>Maximum characters should be 30</small></p>}
                <Form.Group>
                    <Form.Label data-testid="create-form-items">Items</Form.Label>
                    <Form.Control as="textarea" rows={5} data-testid="create-form-items-field" {...register('items', {required: true, maxLength: 255})}/>

                </Form.Group>
                {errors.items && <p style={{color: "red"}}><small>Items are required</small></p>}
                {errors.items?.type === "maxLength" &&
                    <p style={{color: "red"}}><small>Maximum characters should be 255</small></p>}
                <br/>
                <Form.Group>
                    <Button variant="primary" onClick={handleSubmit(createList)} data-testid="create-form-submit">
                        Add list
                    </Button>
                </Form.Group>
            </Form>
        </div>
    )
}

export default CreateList