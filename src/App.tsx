import { FC } from 'react';
import { Route, Router, Switch } from 'wouter';

export const App: FC = () => (
    <Router>
      <nav>Navigation here</nav>
      <Switch>
        <Route path={'/'}>Home</Route>
        <Route path={'/saved'}>Saved</Route>
      </Switch>
    </Router>
);
