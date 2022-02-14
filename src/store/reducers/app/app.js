import { app as actions } from '../../actions';
import Types from '../../../classes/types';

const { appSizesMap } = Types;

const initialState = {
    appSize: appSizesMap.get('desktop').key,
    user: [],
    isLogged: false,
    isWrong: false,
    people: [],
    pageSize: 5,
    currentPage: 1,
    editContact: null,
};

const app = (state = initialState, action) => {
    switch (action.type) {
    case actions.APP_SET_SIZE:
        return {
            ...state,
            appSize: action.payload,
        };

    case actions.LOG_IN:
        const acces = JSON.stringify(action.payload) === JSON.stringify(state.user);
        const wrong = JSON.stringify(action.payload) !== JSON.stringify(state.user);
        return {
            ...state,
            isLogged: acces,
            isWrong: wrong,
        };

    case actions.LOG_OUT:
        return {
            ...state,
            isLogged: false,
            isWrong: false,
        };

    case actions.USER:
        return {
            ...state,
            user: action.payload,
        };

    case actions.PEOPLE:
        return {
            ...state,
            people: action.payload,
        };

    case actions.SET_CURRENT_PAGE:
        return {
            ...state,
            currentPage: action.payload,
        };

    case actions.EDIT_CONTACT:
        return {
            ...state,
            editContact: action.payload,
        };

    default:
        return state;
    }
};

export default app;
