import React from 'react'
import {useTracker} from 'meteor/react-meteor-data';
import {Meteor} from 'meteor/meteor';
import {ListsCollection} from '../../db/ListsCollection';
import ListForm from './ListForm';
import List from './List';
import {Redirect} from 'react-router-dom'

const Dashboard = () => {

    const lists = useTracker(() => ListsCollection.find({}).fetch())
    const user = useTracker(() => Meteor.user())

    return (
        <div>
            <ListForm/>
            {!user && <Redirect to="/"/>}
            <h1>Here are the lists</h1>
            {lists.map(list => <List key={list._id} list={list}/>)}
            
        </div>
    )
}

export default Dashboard
