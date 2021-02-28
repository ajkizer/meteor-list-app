import React, {useState} from 'react'
import {ListsCollection} from '../../db/ListsCollection';

const ListForm = () => {
    const [text, setText] = useState("");

    const handleSubmit = e => {
        e.preventDefault();

        if(!text) return;

        ListsCollection.insert({
            name: text.trim(),
            createdAt: new Date()
        });

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
