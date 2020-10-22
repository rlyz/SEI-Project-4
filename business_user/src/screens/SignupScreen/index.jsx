import React, { useEffect, useState } from 'react'
import './style.css'

import { useDispatch, useSelector } from 'react-redux'
import { signupUser } from '../../redux/auth'
import { useHistory, Link } from 'react-router-dom'

export default function SignupScreen() {
  // check if logged in
  // redirect to homepage if logged in
  const history = useHistory()
  const dispatch = useDispatch()

  const authenticate = useSelector(state => state.auth.isAuthenticated)
  useEffect(() => {
    if (authenticate) {
      history.push('/')
    } 
  }, [])
  
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleEvent = (event) => {
    switch(event.type+event.target.id) {
      case 'changepassword': 
        return setPassword(event.target.value)
      case 'changeusername':
        return setUsername(event.target.value)
      case 'submit':
        dispatch(signupUser({username, password}, history))
        setUsername('')
        setPassword('')
        return 
      default:
        return console.warn(`No action for ${event.type} at ${event.target.id}`)
    }
  }

  return (
    <div className="signup-screen">
      <Link to="/login">Log in</Link>
      <form className="signup__form" onSubmit={(e)=>{e.preventDefault();handleEvent(e)}}>
        <div className="signup__formrow">
          <label htmlFor="username">Username: </label>
          <input type="text" id="username" value={username} onChange={handleEvent}/>
          <span className="inlineError"></span>
        </div>
        <div className="signup__formrow">
          <label htmlFor="password">Password: </label>
          <input type="password" id="password" value={password} onChange={handleEvent}/>
          <span className="inlineError"></span>
        </div>
        <div className="signup__formrow">
          <input type='submit' value='sign up'/>
          <span className="inlineError"></span>
        </div>
      </form>     
    </div>
  )
}
