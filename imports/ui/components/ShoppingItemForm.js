import React, { useState } from 'react'
import { ListsCollection } from '../../db/ListsCollection';

import { Button, Form, Row, Col } from 'react-bootstrap';

import { Meteor } from 'meteor/meteor';

const ShoppingItemForm = ({ listId }) => {

    const [item, setItem] = useState({
        name: "",
        quantity: 1
    });

    const handleSubmit = e => {
        e.preventDefault();

        if (!item.name.length) {
            return
        }

        const list = ListsCollection.findOne({ _id: listId });

        Meteor.call('lists.addItem', list, item);
        setItem({name: "", quantity: 1});
    }

    const decrease = () => {
        if(item.quantity === 1) return
        setItem({...item, quantity: item.quantity -1})
    }

    const increase = () => {
        setItem({...item, quantity: item.quantity + 1})
    }
    return (
        <form onSubmit={handleSubmit}>
            <Row>

                <Col xs={{ span: 4 }} className="pr-0">
                    <Form.Control type="text" className="grow" placeholder="Enter name" value={item.name} onChange={e => setItem({...item, name: e.target.value})} />
                    <Button pill disabled={item.quantity === 1} onClick={decrease}>-</Button>
                    <p>{item.quantity}</p>
                    <Button onClick={increase} pill>+</Button>
                </Col>
                <Col xs={{ span: 3 }}>
                    <Button variant="info" type="submit">Add Item</Button>
                </Col>
            </Row>
        </form>
    )
}

export default ShoppingItemForm
