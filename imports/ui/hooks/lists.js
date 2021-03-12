import { useTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import {ListsCollection} from '../../db/ListsCollection';



export const useListCount = () => useTracker(() => {
const user = Meteor.user();
    let myListCount = 0;
    let sharedListCount = 0;
    let pendingListCount = 0;

    let myLists = [];
    let sharedLists = [];
    let pendingLists = [];

    if(user) {
        myListCount = ListsCollection.find({userId: user._id}).count()
        sharedListCount = ListsCollection.find({sharedWith: user.username}).count();
        pendingListCount = ListsCollection.find({pendingApproval: user.username}).count();

        myLists = ListsCollection.find({userId: user._id}).fetch();
        sharedLists = ListsCollection.find({sharedWith: user.username}).fetch();
        pendingLists = ListsCollection.find({pendingApproval: user.username}).fetch();
    }

    return {
        myListCount,
        sharedListCount,
        pendingListCount,
        myLists,
        sharedLists,
        pendingLists
    }
}, []);


// import { useTracker } from 'meteor/react-meteor-data';
// import { Meteor } from 'meteor/meteor';

// export const useAccount = () => useTracker(() => {
//     const user = Meteor.user()
//     const userId = Meteor.userId()
//     return {
//         user, userId,
//         isLoggedIn: !!userId
//     }
// }, []);