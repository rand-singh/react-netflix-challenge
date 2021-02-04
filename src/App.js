import React, { useEffect } from 'react';
import './App.scss';
import HomeScreen from './screens/HomeScreen'
import LoginScreen from './screens/LoginScreen'
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom'
import { auth } from './firebase';

function App() {
  const user = null;

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(userAuth => {
      if (userAuth) {
        console.log('userAuth',userAuth)
      } else {
      }
    })
    return unsubscribe
  }, [])

  return (
    <div className="app">
      <Router>
        {!user ? (
          <LoginScreen />
        ) : (
          <Switch>
            <Route exact path="/">
              <HomeScreen />
            </Route>
          </Switch>
        )}
      </Router>
    </div>
  );
}

export default App;
