import React from 'react'
import AddUser from './AddUser'
import ItemForm from './ItemForm'
import { Meteor } from 'meteor/meteor';
const List = ({ list, isOwner }) => {

    const handleRemove = e => isOwner && Meteor.call("lists.remove", list._id)

    return (
        <div className="list">
            {isOwner && <p className="align-right" onClick={handleRemove}>x</p>}
            {isOwner && <AddUser listId={list._id} />}


            <h3>{list.name || list._id} created by: {list.creatorName}</h3>
            {isOwner && <small><em>shared with: {list.acceptedShare && list.acceptedShare.length && list.acceptedShare.map(user => user) || "nobody"}</em></small>}

            {list.items && list.items.map((item, idx) => <p key={idx}>{item}
            </p>)}
            <ItemForm listId={list._id} />
        </div>
    )
}

export default List
