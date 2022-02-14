import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Switch, useHistory } from 'react-router-dom';
import { app as actions } from '../../store/actions';
import Types from '../../classes/types';
import Login from '../login';
import ContactListPage from '../contact-list-page';

import './app.scss';

const { appSizesMap, routingMap } = Types;

const App = () => {
    const dispatch = useDispatch();
    const history = useHistory();

    const isLogged = useSelector((state) => state.app.isLogged);

    useEffect(() => {
        // eslint-disable-next-line no-unused-expressions
        !isLogged ? history.push(routingMap.get('log').path) : history.push(routingMap.get('contact-list').path);
    }, [history, isLogged]);

    useEffect(() => {
        dispatch(actions.getUser());
    }, [dispatch]);

    useEffect(() => {
        const getSizeKey = () => {
            const size = document.documentElement.clientWidth;
            if (size < appSizesMap.get('mobile').size) return null;
            if (size >= appSizesMap.get('large').size) return appSizesMap.get('large').key;
            if (size >= appSizesMap.get('desktop').size) return appSizesMap.get('desktop').key;
            if (size >= appSizesMap.get('tablet').size) return appSizesMap.get('tablet').key;
            if (size < appSizesMap.get('tablet').size) return appSizesMap.get('mobile').key;
            return appSizesMap.get('desktop').key;
        };

        const onResize = () => {
            const sizeKey = getSizeKey();
            dispatch(actions.setSize(sizeKey));
        };

        onResize();
        window.addEventListener('resize', onResize);

        return () => window.removeEventListener('resize', onResize);
    }, [dispatch]);

    return (
        <div className="App">
            <Switch>
                <Route path={routingMap.get('log').path} component={Login} exact />
                <Route path={routingMap.get('contact-list').path} component={ContactListPage} exact />
            </Switch>
        </div>
    );
};

export default App;
