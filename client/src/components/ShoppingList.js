import React from "react";
import {Button, Card, Modal} from 'react-bootstrap'

const List = ({title, items, onClick, onDelete}) => {
    return (
        <Card className="shopping_list">
            <Card.Body>
                <p className="date">2021-01-01</p>
                <Card.Title>{title}</Card.Title>
                <p>{items}</p>
                <Button variant="primary" onClick={onClick}>
                    Select
                </Button>
                {' '}
                <Button variant="danger" onClick={onDelete}>
                    Delete
                </Button>
            </Card.Body>

        </Card>
    )
}

export default List