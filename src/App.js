import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import { useSelector } from "react-redux";

import ProtectedRoute from "./components/ProtectedRoute";
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import BoardCollection from './components/BoardCollection/BoardCollection';
import Board from './components/Board/Board';
import TrelloNav from './components/Navbar/TrelloNav';

function App(props) {

  const { isAuthenticated, isLoading } = useSelector(state => state.auth);

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
export default App;
