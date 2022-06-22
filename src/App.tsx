import { FC, useEffect } from 'react';
import { Route, Router, Switch } from 'wouter';
import { observer } from 'mobx-react-lite';
import { useBreedStore } from 'store';
import { NavigationBar, SelectedImageGallery } from 'components/templates';
import { Home } from './pages';

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
          <SelectedImageGallery imageUrls={store.interlacedSelectedImages} />
        </Route>
        <Route path={'/'}>
          <Home />
        </Route>
      </Switch>
    </Router>
  );
});
