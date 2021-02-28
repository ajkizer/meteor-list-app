import React, {useState} from 'react'
import {ListsCollection} from '../../db/ListsCollection';

const ItemForm = ({listId}) => {
    const [text, setText] = useState("");

    const handleSubmit = e => {
        e.preventDefault();

        if(!text) {
            return
        }
        
        const list = ListsCollection.findOne({_id: listId});

        if(!list.items) {
            list.items = []
        }

        list.items.push(text);

        ListsCollection.update(listId, {
            $set: {
                items: list.items
            }
        });

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
