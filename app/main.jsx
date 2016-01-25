import React from 'react';
import ReactDOM from 'react-dom';
import Router from 'react-router';
import 'react-widgets/lib/less/react-widgets.less';
// import createBrowserHistory from 'history/lib/createBrowserHistory';
import createHashHistory from 'history/lib/createHashHistory';
import routes from './routes';
import moment from 'moment';
var momentLocalizer = require('react-widgets/lib/localizers/moment');

momentLocalizer(moment);

window.React = React;

const history = createHashHistory({
    queryKey: false
});
ReactDOM.render(<Router
    children={routes}
    history={history} />,
    document.getElementById('container'));
