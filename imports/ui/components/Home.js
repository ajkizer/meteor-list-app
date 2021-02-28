import React,{useState} from 'react'
import Login from './LoginForm'
import Register from './RegisterForm';
import {useTracker} from 'meteor/react-meteor-data';
import {Meteor} from 'meteor/meteor';
import {Redirect} from 'react-router-dom'
const Home = () => {
    const [isRegistered, toggleRegistered] = useState(false);
    const user = useTracker(() => Meteor.user())

    const handleRegistered = () => toggleRegistered(!isRegistered);

    return (
        <div>
            {user && <Redirect to="/dashboard"/>}
            {isRegistered ? <Login/> : <Register/>}
            <button onClick={handleRegistered}>{isRegistered ? "Don't have an account?" : "Already have an Account?"}</button>
        </div>
    )
}

export default Home
