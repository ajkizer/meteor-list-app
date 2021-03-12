import React from 'react'
import { useTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import { ListsCollection } from '../../db/ListsCollection';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom'
import { useAccount } from '../hooks/accounts';
import { useListCount } from '../hooks/lists';
import ListForm from './ListForm'

const Dashboard = () => {
    const { user, isLoggedIn } = useAccount();

    const { myListCount, sharedListCount, pendingListCount, myLists, sharedLists, pendingLists } = useListCount()





    return (
        <div>
            <ListForm/>
            <Card>
                {myLists.map(list => <Link key={list._id} to={`/dashboard/${list._id}`}>{list.name}</Link>)}
            </Card>

        </div >
    )
}

export default Dashboard
