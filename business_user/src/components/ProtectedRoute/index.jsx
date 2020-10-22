import React from 'react'
import { useSelector } from 'react-redux'

import { Route, Redirect } from 'react-router-dom'

export default function ProtectedRoute({ children, ...rest }) {  
  const authenticate = useSelector(state => state.auth.isAuthenticated)
  return (
    <Route
      {...rest}
      render={({ location }) => 
          authenticate ? (
          children
        ) : (
          <Redirect 
            to={{
              pathname: '/login',
              state: { from: location}
            }}
          />
        )
      }
    />
  )
}