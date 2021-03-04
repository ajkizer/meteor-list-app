import React from 'react'
import AddUser from './AddUser'
import ItemForm from './ItemForm'
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';

import {Card} from 'react-bootstrap';
const List = ({id}) => {

    const user = useTracker(() => Meteor.user())
    const currentList = useTracker(() => ListsCollection.findOne({_id: id}))
    import { ListsCollection } from '../../db/ListsCollection';

    const handleRemove = e => Meteor.call("lists.remove", currentList._id)
    const handleToggleComplete = item => Meteor.call("lists.toggleComplete", currentList, item)


    return (
        <Card>
            {currentList &&<>
         <p className="align-right" onClick={handleRemove}>x</p>
           <AddUser listId={currentList._id} />


            <h3>{currentList.name || currentList._id} created by: {currentList.creatorName}</h3>
         <small><em>shared with: {currentList.acceptedShare && currentList.acceptedShare.length && currentList.acceptedShare.map(user => user) || "nobody"}</em></small>

            {currentList.items && currentList.items.map((item, index) => <p key={index + "index"} onClick={() => handleToggleComplete(item)}>{item.text} {item.isComplete && "complete"}
            </p>)}
            <ItemForm listId={currentList._id} /></>}
        </Card>
    )
}

export default List
