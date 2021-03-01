import React, {useState} from 'react'
import {ListsCollection} from '../../db/ListsCollection';
import {Accounts} from 'meteor/accounts-base';

const AddUser = ({listId}) => {
    const [text, setText] = useState("");
    const [showAlert, toggleAlert] = useState(false);

    const handleSubmit = e => {
        e.preventDefault();

        if(!text) {
            return
        }

        if(!userInfo){
            return toggleAlert(true);
        }
        
        const list = ListsCollection.findOne({_id: listId});

        if(!list.items) {
            list.sharedWith = []
        }

        list.sharedWith.push(userInfo);

        ListsCollection.update(listId, {
            $set: {
                sharedWith: list.sharedWith
            }
        });

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
