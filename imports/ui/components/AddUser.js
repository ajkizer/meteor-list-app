import React, {useState} from 'react'
import {ListsCollection} from '../../db/ListsCollection';

import {Meteor} from 'meteor/meteor';

const AddUser = ({listId}) => {
    const [text, setText] = useState("");
    const [showAlert, toggleAlert] = useState(false);

    const handleSubmit = e => {
        e.preventDefault();

        if(!text) {
            return
        }
        
        const list = ListsCollection.findOne({_id: listId});

        Meteor.call('lists.share', list, text)

        setText("");
    }

    return (
        <form onSubmit={handleSubmit}>
            {showAlert && <div>User Not Found</div>}
            <input type="text" placeholder="Enter Name of Item"  value={text} onChange={e => setText(e.target.value)}/>
            <button type="submit">Add User</button>
        </form>
    )
}

export default AddUser
