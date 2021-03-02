import {check} from 'meteor/check';
import {ListsCollection} from '../db/ListsCollection';

Meteor.methods({
    'lists.insert'(text, username) {
        check(text, String);


        if(!this.userId) {
            throw new Meteor.Error("Not authorized")
        }

        ListsCollection.insert({
            name: text.trim(),
            userId: this.userId,
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
        check(item, String);

        if(!this.userId) {
            throw new Meteor.Error("Not authorized");
        }
       
        if(!list.items) {
            list.items = []
        }

        list.items.push(item);

        ListsCollection.update(list._id, {
            $set: {
                items: list.items
            }
        });
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
    }
})

