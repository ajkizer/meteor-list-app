import React from 'react'
import {ListsCollection} from '../../db/ListsCollection';
import {useTracker} from 'meteor/react-meteor-data';
import {Meteor} from 'meteor/meteor';

const ListApproval = ({list}) => {


    const user = useTracker(() => Meteor.user());
    console.log(user.username)

    const handleApprove = e => {
        e.preventDefault();

        Meteor.call("lists.acceptShare", list, user.username)
    }

    const handleDeny = e => {
        e.preventDefault();

        Meteor.call("lists.unshare", list, user.username)
    }

    return (
        <div className="list">
            <h3>{list.name}</h3>
            <button onClick={handleApprove}>Yes</button><button onClick={handleDeny}>No</button>
        </div>
    )
}

export default ListApproval
