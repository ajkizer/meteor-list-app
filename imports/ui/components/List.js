import React from 'react'
import AddUser from './AddUser'
import ItemForm from './ItemForm'
const List = ({ list, isOwner }) => {
    return (
        <div className="list">
            {isOwner && <AddUser listId={list._id} />}

            <h3>{list.name || list._id} created by: {list.creatorName}</h3>{list.items && list.items.map((item, idx) => <p key={idx}>{item}
            </p>)}
            <ItemForm listId={list._id} />
        </div>
    )
}

export default List
