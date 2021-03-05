import React, { useState } from 'react'
import { ListsCollection } from '../../db/ListsCollection';
import { Col, Row, Button, Form } from 'react-bootstrap';


import { Meteor } from 'meteor/meteor';

const AddUser = ({ listId }) => {
    const [text, setText] = useState("");
    const [showAlert, toggleAlert] = useState(false);
    const [showShare, toggleShare] = useState(false);

    const handleSubmit = e => {
        e.preventDefault();

        if (!text) {
            return
        }

        const list = ListsCollection.findOne({ _id: listId });

        Meteor.call('lists.share', list, text)

        setText("");
    }

    return (

        <Form onSubmit={handleSubmit}>
            <Row>

                <Col xs={{ span: 8 }} className="pr-0">
                    <Form.Control type="text" className="grow" placeholder="Enter username" value={text} onChange={e => setText(e.target.value)} />
                </Col>
                <Col xs={{ span: 4 }}>
                    <Button type="submit">Share</Button> :
                </Col>
            </Row>
        </Form>

    )
}

export default AddUser
