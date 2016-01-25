import React from 'react';
import Location from 'react-router/lib/Location';
import ReactDOMServer from 'react-dom/server';
import  { Router } from 'react-router';

export default function reactRouter(routes, options){
    if(!routes) throw new Error("routes must be provided!");
    options = assign({title:{}}, options);

    return function reactRouteMiddleWarre(req, res, next){
        var state = (req.method !== 'GET' ? {method: req.method, body: req.body} : null);
        route(new Location(req.url, req.query, state), res, next);
    }
    function route(location, res, next) {
        Router.run(routes, location, (err, routerState, transition) => {
            if (err) { return next(err) }

            if (transition.isCancelled) {
                if (transition.redirectInfo) {
                    var {pathname, query, state} = transition.redirectInfo
                    // Re-run routing for redirect locations which have non-URL state
                    if (state) {
                        route(new Location(pathname, query, state), res, next)
                    }
                    else {
                        res.redirect(303, pathname)
                    }
                }
                else {
                    console.error('Transition cancelled in an unexpected way: ', transition.abortReason)
                    next(new Error('Transition cancelled in an unexpected way.'))
                }
                return
            }

            AsyncProps.hydrate(routerState, (err, {propsArray, componentsArray}) => {
                if (err) { return next(err) }
                function createElement(Component, props) {
                var asyncProps = getPropsForComponent(Component, componentsArray, propsArray)
                return <Component {...asyncProps} {...props}/>
                }
                try {
                var html = ReactDOMServer.renderToString(<Router {...routerState} createElement={createElement}/>)
                var title = getTitle(routerState, componentsArray, propsArray, options.title)
                res.render('react', {html, title, props: JSON.stringify(propsArray)})
                }
                catch(err) {
                next(err)
                }
            });
        })
    }
}
