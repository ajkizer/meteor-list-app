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
    }
})