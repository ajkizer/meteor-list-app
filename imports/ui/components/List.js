import React from 'react'
import AddUser from './AddUser'
import ItemForm from './ItemForm'
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import { ListsCollection } from '../../db/ListsCollection';

import { Card, Col, Row } from 'react-bootstrap';
const List = ({ id }) => {

    const user = useTracker(() => Meteor.user())
    const currentList = useTracker(() => ListsCollection.findOne({ _id: id }))


    const handleRemove = e => Meteor.call("lists.remove", currentList._id)
    const handleToggleComplete = item => Meteor.call("lists.toggleComplete", currentList, item)


    return (
        <Card className="effect3 p-4">
            {currentList &&
                <Col>

                    <Row>
                        <Col md={{ span: 4 }} className="pr-0">
                            <h2>{currentList.name}</h2>
                        </Col>

                        <Col md={{ span: 8 }}>
                            <AddUser />
                        </Col>
                    </Row>


                    <Col>

                        <small><em>shared with: {currentList.acceptedShare && currentList.acceptedShare.length && currentList.acceptedShare.map(user => user) || "nobody"}</em></small>

                        {currentList.items && currentList.items.map((item, index) => <p key={index + "index"} className={item.isComplete && "completed"} onClick={() => handleToggleComplete(item)}>{item.text}
                        </p>)}
                    </Col>
                    <ItemForm listId={currentList._id} />

                </Col>}
        </Card >
    )
}

export default List
