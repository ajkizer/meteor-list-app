import React from 'react'
import AddUser from './AddUser'
import ShoppingItemForm from './ShoppingItemForm'
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import { ListsCollection } from '../../db/ListsCollection';

import { Card, Col, Row } from 'react-bootstrap';
const List = ({ id }) => {
    const currentList = useTracker(() => ListsCollection.findOne({ _id: id }))


    const handleRemove = e => Meteor.call("lists.remove", currentList._id)
    const handleToggleComplete = item => Meteor.call("lists.toggleComplete", currentList, item)

    console.log(currentList);

    return (
        <>
            <Row>
                <Col md={{ span: 4 }} className="pr-0">
                    <h2>{currentList.name}</h2>
                </Col>

                <Col md={{ span: 8 }}>
                    <AddUser />
                </Col>
            </Row>
            <Card className="list--checklist effect5 p-4">
                {currentList &&
                    <Col>


                        <Col>

                            <small><em>shared with: {currentList.acceptedShare && currentList.acceptedShare.length && currentList.acceptedShare.map(user => user) || "nobody"}</em></small>
                            <p>{currentList.type}</p>
                        </Col>
                        {currentList.type === "shoppingList" && <ShoppingItemForm listId={currentList._id} />}

                    </Col>}
            </Card >
        </>
    )
}

export default List
