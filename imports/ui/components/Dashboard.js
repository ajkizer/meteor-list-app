import React from 'react'
import { useTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import { ListsCollection } from '../../db/ListsCollection';
import ListForm from './ListForm';
import List from './List';
import { Redirect } from 'react-router-dom'

const Dashboard = () => {

    const user = useTracker(() => Meteor.user())

    if (!user) {
        window.location.href = "/"
    }

    const lists = useTracker(() => {
        if (!user) {
            return []
        }
        return ListsCollection.find({ userId: user._id }).fetch()
    }
    )
    const listcount = useTracker(() => ListsCollection.find({$or: [{ userId: user._id }, {sharedWith: user.username}]}).count())

    const logout = () => Meteor.logout();

    return (
        <div>
            <div className="user" onClick={logout}>
                {user.username} 🚪
            </div>
            <ListForm />
            {!user && <Redirect to="/" />}
            <h1>There are currently {listcount} lists</h1>
            {lists.map(list => <List key={list._id} list={list} />)}

        </div>
    )
}

export default Dashboard
