import React, { useEffect } from 'react';
import { connect } from "react-redux";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";

import { changeBackground, changePhoto, getPhotosList } from './actions';
import Board from './components/Board/Board';
import BoardCollection from './components/BoardCollection/BoardCollection';
import TrelloNav from './components/Navbar/TrelloNav';
import ProtectedRoute from "./components/ProtectedRoute";
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';

function App(props) {

  const { isAuthenticated, isLoading } = props.auth;

  useEffect(() => {
    document.body.style.backgroundImage = 'url(https://images.unsplash.com/photo-1534528696266-aade1e8bae09?ixlib=rb-1.2.1&q=85&fm=jpg&crop=entropy&cs=srgb&ixid=eyJhcHBfaWQiOjE2MDg5Mn0)';
    document.body.style.backgroundSize = 'cover';
    document.body.style.width = '100vl';
    document.body.style.height = '100vh';

    props.getPhotosList("ocean");
  }, []);

  return (
    <Router>
      <TrelloNav isAuthenticated={isAuthenticated} isLoading={isLoading} />

      <Switch>
        <ProtectedRoute
          exact path="/"
          component={BoardCollection}
          isAuthenticated={isAuthenticated}
          isLoading={isLoading}
        />
        <Route path="/signin" component={SignIn} />
        <Route path="/signup" component={SignUp} />
        <Route path="/board/:id" component={Board} isAuthenticated={isAuthenticated} isLoading={isLoading} />
      </Switch>
    </Router>
  );
}

const mapStateToProps = state => ({
  theme: state.theme,
  auth: state.auth,
});

export default connect(mapStateToProps, { changeBackground, changePhoto, getPhotosList })(App);
