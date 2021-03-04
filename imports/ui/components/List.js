import React from 'react'
import AddUser from './AddUser'
import ItemForm from './ItemForm'
import { Meteor } from 'meteor/meteor';

import {Card} from 'react-bootstrap';
const List = ({ list, isOwner }) => {

    const handleRemove = e => isOwner && Meteor.call("lists.remove", list._id)
    const handleToggleComplete = item => Meteor.call("lists.toggleComplete", list, item)

    return (
        <Card>
            {isOwner && <p className="align-right" onClick={handleRemove}>x</p>}
            {isOwner && <AddUser listId={list._id} />}


            <h3>{list.name || list._id} created by: {list.creatorName}</h3>
            {isOwner && <small><em>shared with: {list.acceptedShare && list.acceptedShare.length && list.acceptedShare.map(user => user) || "nobody"}</em></small>}

            {list.items && list.items.map((item, index) => <p key={index + "index"} onClick={() => handleToggleComplete(item)}>{item.text} {item.isComplete && "complete"}
            </p>)}
            <ItemForm listId={list._id} />
        </Card>
    )
}

export default List
