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
import EditProfile from './components/profile-forms/EditProfile'
import AddExperience from './components/profile-forms/AddExperience'
import AddEducation from './components/profile-forms/AddEducation';
import Profiles from './components/profiles/Profiles';
import Profile from './components/profile/Profile';
import Posts from './components/posts/Posts';

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
            <Route  exact path="/profiles" component={Profiles}/>
            <Route   path="/profile/:id" component={Profile}/>
            <PrivateRoute path="/dashboard" component={Dashboard}/>
            <PrivateRoute path="/create-profile" component={CreateProfile}/>
            <PrivateRoute path="/edit-profile" component={EditProfile}/>
            <PrivateRoute path="/add-experience" component={AddExperience}/>
            <PrivateRoute path="/add-education" component={AddEducation}/>
            <PrivateRoute path="/posts" component={Posts}/>

            </Switch>
           
          </section>
    </Fragment>
    </Router>
    </Provider>
    
  );
}

export default App;
