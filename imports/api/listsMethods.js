import {check} from 'meteor/check';
import {ListsCollection} from '../db/ListsCollection';
import {Mongo} from 'meteor/mongo'

Meteor.methods({
    'lists.insert'(text, username, type = "shoppingList" ) {
        check(text, String);



        if(!this.userId) {
            throw new Meteor.Error("Not authorized")
        }

        //when adding users to the DB, sharedWith is the list of people who have
        //accepted the share request.  Pending is where the requests live.

        ListsCollection.insert({
            name: text.trim(),
            userId: this.userId,
            type: type,
            sharedWith: [],
            pendingApproval: [],
            hiddenBy: [],
            appointmentList: [],
            shoppingList: [],
            taskList: [],
            completedItems: [],
            creatorName: username,
            createdAt: new Date()
        })
    },

    'lists.remove'(listId) {
        check(listId, String);

        if(!this.userId) {
            throw new Meteor.Error("Not authorized.");
        }

        ListsCollection.remove(listId);
    },

    'lists.addItem'(list, item) {
        check(item.name, String);

        if(!this.userId) {
            throw new Meteor.Error("Not authorized");
        }
       
        //check list type
        //based on list type, do corresponding action

        let newItem = {};

        const createGroceryObj = () => {
            check(item.quantity, Number);
            check(item.name, String);
    
            newItem = {
                name: item.name,
                quantity: item.quantity,
                retrieved: false,
                _id: new Mongo.ObjectID(),
                createdAt: new Date()
            }
        }

        const createTaskObj = () => {
            check(item.title, String);
            check(item.description, String);
            check(item.isComplete, Boolean);
            
            newItem = {
                title: item.title, 
                _id: new Mongo.ObjectID(),
                createdAt: new Date()
            }
        }
        
        const createAppointmentObj = () => {
            check(item.title, String);
            check(item.details, String);
            check(item.location, String);
       
            newItem = {
                title: item.title,
                details: item.details,
                location: item.location,
                contactInfo: item.contactInfo,
                start: item.start,
                end: item.end,
                _id: new Mongo.ObjectID(),
                createdAt: new Date()
            }
        }

     

        if(list.type === "shoppingList") {
            createGroceryObj()
            list.shoppingList.push(newItem);
            ListsCollection.update(list._id, {
                $set: {
                    shoppingList: list.shoppingList
                }
            })
        
        } else if (list.type=== "taskList"){
            createTaskObj()
            list.taskList.push(newItem)
            ListsCollection.update(list._id, {
                $set: {
                    tasks: list.taskList
                }
            })
        } else if (list.type === "appointmentList") {
            createAppointmentObj()
            list.appointmentList.push(newItem)
            ListsCollection.update(list._id, {
                $set: {
                    appointments: list.appointmentList
                }
            })
        }
    },

    'lists.toggleTaskCompleted'(list, task) {
        if(!task){
            return
        }

        list[list.type].forEach(val => {
            if(val._id.toString() === task._id.toString()){
                val.isComplete = !val.isComplete
            }
        });
    },



    'lists.toggleItemRetrieved'(list, item) {
        if(!item){
            return
        }

        list.shoppingList.forEach(val => {
            if(val._id.toString() === item._id.toString()){
                val.retrieved = !val.retrieved
            }
        });

        ListsCollection.update(list._id, {
            $set: {
                shoppingList: list.shoppingList
            }
        })
    },

    
    'lists.removeItem'(list, item) {
        if(!item){
            return
        }

        list[list.type].filter(val => val._id.toString() !== item._id.toString());

        ListsCollection.update(list._id, {
            $set: {
                [list.type]: list[list.type]
            }
        })
    },


    'lists.share'(list, shareRequest) {
        check(shareRequest, String);

        console.log(list);
        if(!this.userId){
            throw new Meteor.Error("Not authorized");
        }

       //takes username and pushes into array representing users with whom this list is shared
       //only shared with 10 people

        if(!list.sharedWith){
            list.sharedWith = []
        }

        if(list.sharedWith.length === 10){
            throw new Meteor.Error("ony 10 people allowed in share queue!")
        }

        if(!list.acceptedShare){
            list.acceptedShare = []
        }

        if(list.acceptedShare.includes(shareRequest
            )){
            throw new Meteor.Error("list is already shared with this user")
        }

        list.sharedWith.push(shareRequest)

        ListsCollection.update(list._id, {
            $set: {
                sharedWith: list.sharedWith
            }
        })
    },

    'lists.acceptShare'(list, acceptRequest) {

        if(!this.userId){
            throw new Meteor.Error("Not authorized")
        }

        if(!list.acceptedShare){
            list.acceptedShare = []
        }
        

        if(list.acceptedShare.includes(acceptRequest)){
            throw new Meteor.Error("User has already accepted this request")
        }

        list.acceptedShare.push(acceptRequest)

        let newShared = list.sharedWith.filter(item => item !== acceptRequest)

        ListsCollection.update(list._id, {
            $set: {
                acceptedShare: list.acceptedShare,
                sharedWith: newShared
            }
        })
        
    },
    
    'lists.unshare'(list, username) {
        check(username, String);
        let newAccepted;
        let newShared;

        if(!this.userId){
            throw new Meteor.Error("Not authorized")
        }

        if(!list.sharedWith){
            throw new Meteor.Error("List has not been shared with anyone")
        }

        if(list.acceptedShare){
            newAccepted = list.acceptedShare.filter(item => item !== username);
        }

        newShared = list.sharedWith.filter(item => item !== username);

        ListsCollection.update(list._id, {
            $set: {
                acceptedShare: newAccepted,
                sharedWith: newShared
            }
        })
    },




    'lists.updateItem'(list, item, updates) {
        // title: item.title,
        // details: item.details,
        // location: item.location,
        // contactInfo: item.contactInfo,
        // start: item.start,
        // end: item.end

        list[list.type].forEach(val => {
            if(val._id.toString() === item._id.toString()){
                val = {...val, ...updates}
            }
        })

        ListsCollection.update(list._id, {
            $set: {
                [list.type]: list[list.type]
            }
        })
    },

    'lists.hide'(list, username) {
        if(list.hiddenBy.includes(username)) return

        list.hiddenBy.push(username);

        ListsCollection.update(list._id, {
            $set: {
                hiddenBy: list.hiddenBy
            }
        })
    },

    'lists.unhide'(list, username) {
        if(!list.hiddenBy.includes(username)) return
        list.hiddenBy.filter(user => user !== username);

        ListsCollection.update(list._id, {
            $set: {
                hiddenBy: list.hiddenBy
            }
        })
    },

    'lists.remove'(listId) {
        check(listId, String);
        

        ListsCollection.remove({_id: listId})
    }


    //****only allowed by user and those who the list is shared with****

    //**DONE, AWAITING TESTING**
    //add shopping list item 
    //check off shopping list item
    //add task
    //check off task
    //add appointment
    //delete shopping list item
    //delete task
    //remove appointment
    //hide list
    //unhide list



    //**NOT DONE YET */

  
})

