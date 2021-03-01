import React from 'react'
import AddUser from './AddUser'
import ItemForm from './ItemForm'
const List = ({ list }) => {
    return (
        <div className="list">
            <AddUser />
            <h3>{list.name || list._id} user: {list.userId}</h3>{list.items && list.items.map((item, idx) => <p key={idx}>{item}
            </p>)}
            <ItemForm listId={list._id} />
        </div>
    )
}

export default List
