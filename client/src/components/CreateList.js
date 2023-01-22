import React from "react"
import {Form, Button} from "react-bootstrap";
import {useForm} from "react-hook-form";

const CreateList = () => {

    const {register, handleSubmit, reset, formState: {errors}} = useForm()

    const createList =(data) => {
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
            .then(res=>res.json())
            .then(data=>{
                console.log(data)
            })
            .catch(err=>console.log(err))

    }

    return (
        <div className="container">
            <h1>Create new Shopping List</h1>
            <Form>
                <Form.Group>
                    <Form.Label>Title</Form.Label>
                    <Form.Control type="text"
                                  {...register('title', {required: true, maxLength: 30})}/>

                </Form.Group>
                {errors.title && <p style={{color: "red"}}><small>Title is required</small></p>}
                {errors.title?.type === "maxLength" &&
                    <p style={{color: "red"}}><small>Maximum characters should be 30</small></p>}
                <Form.Group>
                    <Form.Label>Items</Form.Label>
                    <Form.Control as="textarea" rows={5} {...register('items', {required: true, maxLength: 255})}/>

                </Form.Group>
                {errors.items && <p style={{color: "red"}}><small>Items are required</small></p>}
                {errors.items?.type === "maxLength" &&
                    <p style={{color: "red"}}><small>Maximum characters should be 255</small></p>}
                <br/>
                <Form.Group>
                    <Button variant="primary" onClick={handleSubmit(createList)}>
                        Add list
                    </Button>
                </Form.Group>
            </Form>
        </div>
    )
}

export default CreateList