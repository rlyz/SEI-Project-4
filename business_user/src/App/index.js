import React, { useCallback, useEffect, useState } from 'react';
import './App.css';
import { Switch, Route, Redirect } from 'react-router-dom'
import ProtectedRoute from '../components/ProtectedRoute'
import FullpageLoadingScreen from '../screens/FullpageLoadingScreen'

// redux actions
import { getAllShops } from '../redux/shops'
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
  useEffect(() => {
    if (!authLoading) {
      loadShops()
    }
  }, [authLoading, loadShops])

  if (authLoading) {
    return <FullpageLoadingScreen />
  }

  return (
    <div className="App">
      <Navbar />
      <Switch>
        <ProtectedRoute exact path="/">
          <HomeScreen />
        </ProtectedRoute>
        <Route exact path="/login">
          <LoginScreen />
        </Route>
        <Route exact path="/signup">
          <SignupScreen />
        </Route>
        <Route path="/*">
          <Redirect to="/login"/>
        </Route>
      </Switch>
    </div>
  );
}

export default App;
