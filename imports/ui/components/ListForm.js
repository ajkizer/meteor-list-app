import React, {useState} from 'react'
import {ListsCollection} from '../../db/ListsCollection';
import {useTracker} from 'meteor/react-meteor-data';
import {Meteor} from 'meteor/meteor';

const ListForm = () => {
    const [text, setText] = useState("");
    const user = useTracker(() => Meteor.user())
   

    const handleSubmit = e => {
        e.preventDefault();

        if(!text) return;

        Meteor.call('lists.insert', text, user.username)
        setText("");
    }
    
    return (
        <form onSubmit={handleSubmit}>
            <input type="text" placeholder="Enter Name of List"  value={text}m onChange={e => setText(e.target.value)}/>
            <button type="submit">Create List</button>
        </form>
    )
}

export default ListForm

