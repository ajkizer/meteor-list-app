import React from 'react'
import {useParams} from 'react-router-dom';
import List from './List';
import { useTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import { ListsCollection } from '../../db/ListsCollection';

const ListPage = () => {
    console.log("hello")
    const params = useParams();
   
    console.log(params.id)
    return (
        <div className="p-4">
          
            <List id={params.id} />
        </div>
    )
}

export default ListPage
