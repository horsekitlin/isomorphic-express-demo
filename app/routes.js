import React from 'react';
import App from './components/App';
import PageA from './pages/pagea';
import PageB from './pages/pageb';
import { Route } from 'react-router';

const routes = (
    <Route component={App}>
        <Route path='/pageA' component={PageA}/>
        <Route path='/pageB' component={PageB} />
    </Route>
);

export default routes;
