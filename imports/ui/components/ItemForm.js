import React, { useState } from 'react'
import { ListsCollection } from '../../db/ListsCollection';

import { Button, Form, Row, Col } from 'react-bootstrap';

import { Meteor } from 'meteor/meteor';

const ItemForm = ({ listId }) => {

    const [text, setText] = useState("");

    const handleSubmit = e => {
        e.preventDefault();

        if (!text) {
            return
        }

        const list = ListsCollection.findOne({ _id: listId });

        Meteor.call('lists.addItem', list, text);
        setText("");
    }
    return (
        <form onSubmit={handleSubmit}>
            <Row>

                <Col xs={{ span: 4 }} className="pr-0">
                    <Form.Control type="text" className="grow" placeholder="Enter username" value={text} onChange={e => setText(e.target.value)} />
                </Col>
                <Col xs={{ span: 3 }}>
                    <Button variant="info" type="submit">Add Item</Button>
                </Col>
            </Row>
        </form>
    )
}

export default ItemForm
