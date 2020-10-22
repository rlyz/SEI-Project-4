import React, { useEffect, useState } from 'react'
import './style.css'

import { useDispatch, useSelector } from 'react-redux'
import { loginUser } from '../../redux/auth'
import { getAllShops } from '../../redux/shops'
import { useHistory, Link } from 'react-router-dom'

export default function LoginScreen() {
  // check if logged in
  // redirect to homepage if logged in
  const history = useHistory()
  const dispatch = useDispatch()

  const authenticate = useSelector(state => state.auth.isAuthenticated)
  useEffect(() => {
    if (authenticate) {
      dispatch(getAllShops())
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
        dispatch(loginUser({username, password}, history))
        setUsername('')
        setPassword('')
        return 
      default:
        return console.warn(`No action for ${event.type} at ${event.target.id}`)
    }
  }

  return (
    <div className="login-screen">
      <Link to="/signup">Sign up</Link>
      <form className="login__form" onSubmit={(e)=>{e.preventDefault();handleEvent(e)}}>
        <div className="login__formrow">
          <label htmlFor="username">Username: </label>
          <input type="text" id="username" value={username} onChange={handleEvent}/>
          <span className="inlineError"></span>
        </div>
        <div className="login__formrow">
          <label htmlFor="password">Password: </label>
          <input type="password" id="password" value={password} onChange={handleEvent}/>
          <span className="inlineError"></span>
        </div>
        <div className="login__formrow">
          <input type='submit' value='submit'/>
          <span className="inlineError"></span>
        </div>
      </form>     
    </div>
  )
}
