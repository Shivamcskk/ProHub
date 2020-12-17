import React ,{Fragment,useEffect} from 'react'
import {BrowserRouter as Router,Route,Switch} from 'react-router-dom'
import './App.css';
import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import {Provider} from 'react-redux'
import store from './store';
import Alert from './components/layout/Alert'
import {loaduser} from './actions/auth';
import setAuthToken from './utils/setAuthToken'
import PrivateRoute from './components/routing/PrivateRoute'
import Dashboard from './components/dashboard/Dashboard';
import CreateProfile from './components/profile-forms/CreateProfile'
if(localStorage.token)
    {
        setAuthToken(localStorage.token);
    }

const App =()=> {

  useEffect(()=>{
    store.dispatch(loaduser());
  },[])
  return (
    <Provider store={store}>
      <Router>
      <Fragment>
        <Navbar/>
        <Route  exact path="/" component={Landing}/>
          <section className="container">
          <Alert/>
            <Switch>
            <Route   path="/login" component={Login}/>
            <Route   path="/register" component={Register}/>
            <PrivateRoute path="/dashboard" component={Dashboard}/>
            <PrivateRoute path="/create-profile" component={CreateProfile}/>
            </Switch>
           
          </section>
    </Fragment>
    </Router>
    </Provider>
    
  );
}

export default App;
