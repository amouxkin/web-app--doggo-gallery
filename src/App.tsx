import { FC, useEffect } from 'react';
import { Route, Router, Switch } from 'wouter';
import { NavigationBar } from 'components/templates';
import { Home } from './pages';
import { observer } from 'mobx-react-lite';
import { useBreedStore } from 'store';

export const App: FC = observer(() => {
  const store = useBreedStore();

  useEffect(() => {
    store.fetchCategories();
  }, []);

  return (
    <Router>
      <NavigationBar />
      <Switch>
        <Route path={'/'}>
          <Home />
        </Route>
        <Route path={'/saved'}>Saved</Route>
      </Switch>
    </Router>
  );
});
