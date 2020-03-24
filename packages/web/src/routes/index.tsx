import React from 'react';
import { Switch } from 'react-router-dom';
import Route from './Route';

import Home from '../pages/Home';
import Login from '../pages/Login';
import Register from '../pages/Register';
import Notes from '../pages/Notes';
import Note from '../pages/Note';
import CreateNote from '../pages/CreateNote';

export default function Routes() {
  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/login" component={Login} />
      <Route path="/register" component={Register} />
      <Route exact path="/notes" component={Notes} isPrivate />
      <Route exact path="/note/:id" component={Note} isPrivate />
      <Route path="/create" component={CreateNote} isPrivate />
    </Switch>
  );
}
