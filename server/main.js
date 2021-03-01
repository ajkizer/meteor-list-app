import { Meteor } from 'meteor/meteor';
import {Accounts} from 'meteor/accounts-base'
import {ListsCollection} from '../imports/db/ListsCollection';
import '../imports/api/listsMethods';



const insertList = (listInfo, user) => ListsCollection.insert({name: listInfo, userId: user._id, createdAt: new Date()})

Meteor.startup(() => {
  if(!Accounts.findUserByUsername('admin')){
    Accounts.createUser({username: "admin", password: "adminadmin123"})
  }

  const user = Accounts.findUserByUsername('admin')
  
  if(ListsCollection.find().count() === 0) {
    ["Groceries", "Chores", "Notes"].forEach(name => insertList(name, user))
  }
});
