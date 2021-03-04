import React from 'react'
import AddUser from './AddUser'
import ItemForm from './ItemForm'
import { Meteor } from 'meteor/meteor';

import {Card} from 'react-bootstrap';
const List = ({ currentList, isOwner = true }) => {
    console.log(currentList)

    const handleRemove = e => isOwner && Meteor.call("lists.remove", currentList._id)
    const handleToggleComplete = item => Meteor.call("lists.toggleComplete", currentList, item)

    return (
        <Card>
            {isOwner && <p className="align-right" onClick={handleRemove}>x</p>}
            {isOwner && <AddUser listId={currentList._id} />}


            <h3>{currentList.name || currentList._id} created by: {currentList.creatorName}</h3>
            {isOwner && <small><em>shared with: {currentList.acceptedShare && currentList.acceptedShare.length && currentList.acceptedShare.map(user => user) || "nobody"}</em></small>}

            {currentList.items && currentList.items.map((item, index) => <p key={index + "index"} onClick={() => handleToggleComplete(item)}>{item.text} {item.isComplete && "complete"}
            </p>)}
            <ItemForm listId={currentList._id} />
        </Card>
    )
}

export default List
