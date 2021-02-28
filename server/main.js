import { Meteor } from 'meteor/meteor';
import {Accounts} from 'meteor/accounts-base'
import {ListsCollection} from '../imports/db/ListsCollection';


const insertList = listInfo => ListsCollection.insert({name: listInfo.name})

Meteor.startup(() => {
  if(!Accounts.findUserByUsername('admin')){
    Accounts.createUser({username: "admin", password: "adminadmin123"})
  }
  if(ListsCollection.find().count() === 0) {
    ["Groceries", "Chores", "Appointments", "Notes"].forEach(insertList)
  }
});
