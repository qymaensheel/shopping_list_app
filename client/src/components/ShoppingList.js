import React from "react";
import {Card} from 'react-bootstrap'

const List = ({title, items}) => {
    return (
        <Card className="shopping_list">
            <Card.Body>
                <p className="date">2021-01-01</p>
                <Card.Title>{title}</Card.Title>
                <p>{items}</p>
            </Card.Body>

        </Card>
    )
}

export default List