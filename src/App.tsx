import { FC, useEffect } from 'react';
import { Route, Router, Switch } from 'wouter';
import { observer } from 'mobx-react-lite';
import { useBreedStore } from 'store';
import { NavigationBar } from 'components/templates';
import { Home, Saved, Selector } from './pages';

export const App: FC = observer(() => {
  const store = useBreedStore();

  useEffect(() => {
    store.fetchCategories();
  }, []);

  return (
    <Router>
      <NavigationBar />
      <Switch>
        <Route path={'/saved'}>
          <Saved />
        </Route>
        <Route path={'/selector'}>
          <Selector />
        </Route>
        <Route path={'/'}>
          <Home />
        </Route>
      </Switch>
    </Router>
  );
});
