import React from 'react'
import { useTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import { ListsCollection } from '../../db/ListsCollection';
import ListForm from './ListForm';
import List from './List';
import ListApproval from './ListApproval'
import { Redirect } from 'react-router-dom'

const Dashboard = () => {

    const user = useTracker(() => Meteor.user())

    if (!user) {
        window.location.href = "/"
    }

    const myLists = useTracker(() => {
        if (!user) {
            return []
        }
        return ListsCollection.find({userId: user._id }).fetch()
    }
    )



    const sharedNotifications = useTracker(() => {
        if(!user){
            return []
        }
        return ListsCollection.find({sharedWith: user.username}).fetch();
    })

    const sharedLists = useTracker(() => {
        if(!user) {
            return []
        }

        return ListsCollection.find({acceptedShare: user.username})
    })

    const myListCount = useTracker(() => ListsCollection.find({ userId: user._id }).count())
    const sharedNotificationsCount = useTracker(() => ListsCollection.find({sharedWith: user.username}).count());
    const sharedListsCount = useTracker(() => ListsCollection.find({acceptedShare: user.username}).count())
    const logout = () => Meteor.logout();
    

    return (
        <div>
            <ListForm />
            {!user && <Redirect to="/" />}
            <div>
            <h2>There are currently {myListCount} lists that you have created</h2>
            {myLists.map(list => <List key={list._id} list={list} isOwner={true}
            />)}
            </div>
            <div>
                <h2>There are currently {sharedListsCount} lists you share with other users</h2>
                {sharedLists.map(list => <List key={list._id} list={list}/>)}
            </div>
            <div>
                <h2>There are currently {sharedNotificationsCount} lists awaiting your approval</h2>
                {sharedNotifications.map(list => <ListApproval  key={list._id} list={list}/>)}
            </div>
        </div>
    )
}

export default Dashboard
