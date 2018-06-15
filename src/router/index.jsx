'use strict';
import React from 'react';
import ReactDOM from 'react-dom';
import {Route, Router, HashRouter, Switch, MemoryRouter} from 'react-router-dom';
import {Provider} from 'react-redux';
import history from '../common/lib/history';
import store from '../store';
import asyncComponent from '../common/components/async'; //js 加载

import Error from '../common/components/error';
import Loading from '../common/components/loading';//页面加载loading

const loginRouter = asyncComponent(() => import('../components/login').then(module => module.default).catch((err)=>{return 101}))

class Component extends React.Component {
    constructor(props) {
        super(props);
    }
    componentWillMount() {
        window.width = document.getElementById('app').offsetWidth
    }
    render() {

        return (
            <Provider store={store}>
                <Router history={history}>
                    <Route render={({ location }) => (
                        <div className="container">
                            <Switch location={location}>
                                <Route path="/" component={loginRouter} />
                                <Route component={Error} />
                            </Switch>
                        </div>
                        )
                    }/>
                </Router>
            </Provider>
        )
    }
}

export default Component;
