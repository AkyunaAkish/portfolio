import React, { PureComponent } from 'react';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';
import { asyncComponent } from 'react-async-component';

import Layout from './components/Layout/Layout';

const Portfolio = asyncComponent({
    resolve: () => import('./components/Portfolio/Portfolio')
});

const Contact = asyncComponent({
    resolve: () => import('./components/Contact/Contact')
});

class Router extends PureComponent {
    render() {
        let routes = (
            <Switch>
                <Route exact path='/' component={ Portfolio } />
                <Route exact path='/contact' component={ Contact } />
                <Redirect from='*' to='/' />
            </Switch>
        );

        return (    
            <React.Fragment>
                <BrowserRouter>
                    <Layout routes={ routes }/>
                </BrowserRouter>
            </React.Fragment>
        );
    }
}

export default Router;