import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import { rootReducer } from './reducers';
import ApiService from '../classes/api-service';

const apiService = new ApiService();

const composeEnhancers = composeWithDevTools({
    trace: true,
});

export default createStore(rootReducer, composeEnhancers(applyMiddleware(thunk.withExtraArgument(apiService))));
