import React, {useState} from 'react'
import {ListsCollection} from '../../db/ListsCollection';

import {Meteor} from 'meteor/meteor';

const ItemForm = ({listId}) => {
    const [text, setText] = useState("");

    const handleSubmit = e => {
        e.preventDefault();

        if(!text) {
            return
        }
        
        const list = ListsCollection.findOne({_id: listId});

        Meteor.call('lists.addItem', list._id, text);

        setText("");
    }
    return (
        <form onSubmit={handleSubmit}>
            <input type="text" placeholder="Enter Name of Item"  value={text}m onChange={e => setText(e.target.value)}/>
            <button type="submit">Add item</button>
        </form>
    )
}

export default ItemForm
