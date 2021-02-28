import React, {useState} from 'react'
import {Meteor} from 'meteor/meteor';

const RegisterForm = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [password2, setPassword2] = useState("");

    const submit = e => {
        e.preventDefault();
        if(password !== password2){
            return
        }
        Meteor.createUser(username, password)
    }

    return (
    <form onSubmit={submit} className="login-form">
      <label htmlFor="username">Username</label>

      <input
        type="text"
        placeholder="Username"
        name="username"
        required
        onChange={e => setUsername(e.target.value)}
      />

      <label htmlFor="password">Password</label>

      <input
        type="password"
        placeholder="Password"
        name="password"
        required
        onChange={e => setPassword(e.target.value)}
      />

      <label htmlFor="password2">Confirm Password</label>

      <input type="password" placeholder="Confirm Password" name="password2" required onChange={e => setPassword2(e.target.value)}/>

      <button type="submit">Log In</button>
    </form>
    )
}

export default RegisterForm
