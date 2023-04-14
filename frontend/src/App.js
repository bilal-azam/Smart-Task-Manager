import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import TaskList from './components/TaskList';
import Login from './components/Login';
import Register from './components/Register';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <ProtectedRoute exact path="/" component={TaskList} />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
