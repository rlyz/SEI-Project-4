import React from 'react'
import './style.css'

import { useDispatch, useSelector } from 'react-redux'
import { logoutUser } from '../../redux/auth'

export default function Navbar() {
  const dispatch = useDispatch()
  const authenticate = useSelector(state => state.auth.isAuthenticated)

  
  return (
    <div className="navbar flex-center">
      <h3>Logo here</h3>  
      {
        !authenticate &&
          <button>Sign in</button>
      }   
      {
        authenticate &&
          <button onClick={()=>dispatch(logoutUser())}>Sign out</button>
      } 
    </div>
  )
}
