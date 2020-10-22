import React, { useCallback, useEffect, useState } from 'react';
import './App.css';
import { Switch, Route, Redirect } from 'react-router-dom'
import ProtectedRoute from '../components/ProtectedRoute'
import FullpageLoadingScreen from '../screens/FullpageLoadingScreen'

// redux actions
import { getAllShops, openSse } from '../redux/shops'
import { verifyUser } from '../redux/auth'
import { useDispatch, useSelector } from 'react-redux'
import LoginScreen from '../screens/LoginScreen';
import Navbar from '../components/Navbar';
import SignupScreen from '../screens/SignupScreen';
import HomeScreen from '../screens/HomeScreen';

function App() {
  const dispatch = useDispatch()
  const authLoading = useSelector(state => state.auth.loading)
    // check for cookies/token
    // do this in a global state to make it easily accessible 
    // in nested components
    // verify user
    // if valid user, fetch data
  const verify = useCallback(() => dispatch(verifyUser()), [dispatch]);
  useEffect(() => {
    verify()
  }, [verify])
  // check if logged in
  // no - go to log in page
  // yes - go to dashboard
  const loadShops = useCallback(() => dispatch(getAllShops()), [dispatch]);
  const sse = useCallback(() => dispatch(openSse()), [dispatch]);
  useEffect(() => {
    if (!authLoading) {
      loadShops()
      sse()
    }
  }, [authLoading, loadShops, sse])

  if (authLoading) {
    return <FullpageLoadingScreen />
  }

  return (
    <div className="App">
      <Navbar />
      <Switch>
        <ProtectedRoute exact path="/business">
          <HomeScreen />
        </ProtectedRoute>
        <Route exact path="/business/login">
          <LoginScreen />
        </Route>
        <Route exact path="/business/signup">
          <SignupScreen />
        </Route>
        <Route path="/business/*">
          <Redirect to="/business/login"/>
        </Route>
      </Switch>
    </div>
  );
}

export default App;
