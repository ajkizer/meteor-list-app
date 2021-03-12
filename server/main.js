
import {Accounts} from 'meteor/accounts-base'
import {ListsCollection} from '../imports/db/ListsCollection';
import '../imports/api/listsMethods';


const insertList = (name, user, id) => ListsCollection.insert({ name, userId: user._id, type="", sharedWith=[], pendingApproval=[], hiddenBy=[], createdAt: new Date()})

Meteor.startup(() => {
  if(!Accounts.findUserByUsername('admin')){
    Accounts.createUser({username: "admin", password: "adminadmin123"})
  }

  const user = Accounts.findUserByUsername('admin')
  
  if(ListsCollection.find().count() === 0) {
    ["Groceries", "Chores", "Notes"].forEach(name => insertList(name, user))
  }
});