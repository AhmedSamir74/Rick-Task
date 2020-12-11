import { createStore, combineReducers, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';

import { authReducer } from '../reducers';

const mainReducer = combineReducers({
    auth: authReducer,
});

export const store = createStore(mainReducer, applyMiddleware(ReduxThunk));
