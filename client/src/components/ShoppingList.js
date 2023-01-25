import React from "react";
import {Button, Card, Modal} from 'react-bootstrap'

const List = ({title, items, onClick, onDelete}) => {
    return (
        <Card className="shopping_list">
            <Card.Body>
                <p className="date" data-testid="list-date">3/4/2023</p>
                <Card.Title data-testid="list-title">{title}</Card.Title>
                <p className="items_list" data-testid="list-items">{items}</p>
                <Button variant="primary" onClick={onClick} data-testid="list-select">
                    Select
                </Button>
                {' '}
                <Button variant="danger" onClick={onDelete} data-testid="list-delete">
                    Delete
                </Button>
            </Card.Body>

        </Card>
    )
}

export default List