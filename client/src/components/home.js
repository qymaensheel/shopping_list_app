import React, {useEffect, useState} from 'react'
import {Link} from "react-router-dom";
import {useAuth} from "../auth";
import ShoppingList from "./ShoppingList";
import {Button, Form, Modal} from "react-bootstrap";
import {useForm} from "react-hook-form";
import DatePicker from "react-date-picker";


const LoggedInHome = () => {

    const [lists, setLists] = useState([])
    const [show, setShow] = useState(false)
    const {register, reset, handleSubmit, setValue, formState: {errors}} = useForm()
    const [listId, setlistId] = useState(0)

    useEffect(
        () => {
            fetch('/shopping_list/shopping_lists')
                .then(res => res.json())
                .then(data => {
                    setLists(data)
                })
                .catch(err => console.log(err))
        }, []
    )


    const closeModal = () => {
        setShow(false)
    }

    const showModal = (id) => {
        setShow(true)
        setlistId(id)
        lists.map(
            (item) => {
                if (item.id === id) {
                    setValue('title', item.title)
                    setValue('items', item.items)
                }
            }
        )
    }

    const updateList = (data) => {

        const token = localStorage.getItem('REACT_TOKEN_AUTH_KEY')

        const requestOptions = {
            method: 'PUT',
            headers: {
                'content-type': 'application/json',
                'Authorization': `Bearer ${JSON.parse(token)}`
            },
            body: JSON.stringify(data)
        }

        fetch(`/shopping_list/shopping_list/${listId}`, requestOptions)
            .then(res => res.json())
            .then(data => {
                console.log(data)

                window.location.reload()


            })
            .catch(err => console.log(err))


    }

    const deleteList = (listId) => {
        const token = localStorage.getItem('REACT_TOKEN_AUTH_KEY')

        const requestOptions = {
            method: 'DELETE',
            headers: {
                'content-type': 'application/json',
                'Authorization': `Bearer ${JSON.parse(token)}`
            }
        }

        fetch(`/shopping_list/shopping_list/${listId}`, requestOptions)
            .then(res => res.json())
            .then(data => {
                console.log(data)
                window.location.reload()
            })
            .catch(err => console.log(err))
    }

    return (
        <div className="shopping_lists">
            <Modal
                show={show}
                size="lg"
                onHide={closeModal}
            >
                <Modal.Header closeButton>
                    <Modal.Title>
                        Shopping list
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group>
                            <Form.Label>Title</Form.Label>
                            <Form.Control type="text" data-testid="list-title-modal"
                                          {...register('title', {required: true, maxLength: 30})}/>

                        </Form.Group>
                        {errors.title && <p style={{color: "red"}} data-testid="list-title-required"><small>Title is required</small></p>}
                        {errors.title?.type === "maxLength" &&
                            <p style={{color: "red"}} data-testid="list-title-long"><small>Maximum characters should be 30</small></p>}
                        <Form.Group>
                            <Form.Label>Items</Form.Label>
                            <Form.Control as="textarea" data-testid="list-items-modal" rows={5} {...register('items', {
                                required: true,
                                maxLength: 255
                            })}/>

                        </Form.Group>
                        {errors.items && <p style={{color: "red"}} data-testid="list-items-required"><small>Items are required</small></p>}
                        {errors.items?.type === "maxLength" &&
                            <p style={{color: "red"}} data-testid="list-items-long"><small>Maximum characters should be 255</small></p>}
                        <br/>
                        <Form.Group>
                            <Form.Label data-testid="create-form-date">Due date</Form.Label>
                            <br/>
                            <DatePicker value={new Date(2023, 2, 4)} data-testid="create-form-date-field"/>

                        </Form.Group>
                        <br/>
                        <Form.Group>
                            <Button variant="primary" onClick={handleSubmit(updateList)}>
                                Save
                            </Button>
                        </Form.Group>
                    </Form>
                </Modal.Body>

            </Modal>
            {
                lists.map(
                    (list, index) => (
                        <ShoppingList title={list.title} items={list.items} key={index}
                                      onClick={() => {
                                          showModal(list.id)
                                      }
                                      }
                                      onDelete={() => {
                                          deleteList(list.id)
                                      }
                                      }
                        />
                    )
                )
            }
        </div>

    )
}

const LoggedOutHome = () => {


    return (
        <div className="containerCls">
            <h1 className="heading" data-testid="header">ShoppingApp</h1>
            <br/>


            <Link to='/register' className="btn btn-primary btn-lg" data-testid="continue-btn">Please register to
                continue</Link>
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