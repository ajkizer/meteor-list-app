import React from 'react'
import { useTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import { ListsCollection } from '../../db/ListsCollection';
import {Card} from 'react-bootstrap';
import {Link} from 'react-router-dom'

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

        return ListsCollection.find({acceptedShare: user.username}).fetch();
    })

    const myListCount = useTracker(() => ListsCollection.find({ userId: user._id }).count())
    const sharedNotificationsCount = useTracker(() => ListsCollection.find({sharedWith: user.username}).count());
    const sharedListsCount = useTracker(() => ListsCollection.find({acceptedShare: user.username}).count())
 

    console.log(myLists);
    

    return (
        <div>
            <Card>
            <h3>My Lists ({myListCount})</h3>
            <ul>
                {myLists.map(list => <li key={list._id}><Link to={`/dashboard/${list._id}`}>{list.name}</Link></li>)}
            </ul>
            <h3>Shared Lists ({sharedListsCount})</h3>
            <ul>
                {sharedLists.map(list => <li key={list._id}><Link to={`/dashboard/${list._id}`}>{list.name}</Link></li>)}
            </ul>
            </Card>
        </div>
    )
}

export default Dashboard
