export const APP_SET_SIZE = 'APP_SET_SIZE';
export const LOG_IN = 'LOG_IN';
export const LOG_OUT = 'LOG_OUT';
export const PEOPLE = 'PEOPLE';
export const USER = 'USER';
export const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE';
export const EDIT_CONTACT = 'EDIT_CONTACT';

export const setSize = (payload = '') => ({ type: APP_SET_SIZE, payload });

export const logIn = (payload = '') => ({ type: LOG_IN, payload });

export const logOut = (payload = '') => ({ type: LOG_OUT, payload });

export const people = (payload = '') => ({ type: PEOPLE, payload });

export const user = (payload = '') => ({ type: USER, payload });

export const setPage = (payload = '') => ({ type: SET_CURRENT_PAGE, payload });

export const editContact = (payload = '') => ({ type: EDIT_CONTACT, payload });

export const getUser = () => (dispatch, getState, apiService) => {
    apiService.getUser()
        .then((res) => {
            dispatch(user(res.data));
        })
        // eslint-disable-next-line no-console
        .catch((err) => console.log(err));
};

export const getPeople = () => (dispatch, getState, apiService) => {
    apiService.getPeople()
        .then((res) => {
            dispatch(people(res.data));
        })
        // eslint-disable-next-line no-console
        .catch((err) => console.log(err));
};

export const deleteContact = (id) => (dispatch, getState, apiService) => {
    apiService.delContact(id)
        .then(() => {
            dispatch(getPeople());
        });
};

export const saveStatus = (item, status) => (dispatch, getState, apiService) => {
    apiService.saveStatus(item, status)
        .then(() => {
            dispatch(getPeople());
        });
};

export const addContact = (name, status, avatar, id) => (dispatch, getState, apiService) => {
    apiService.addContact(name, status, avatar, id)
        .then(() => {
            dispatch(getPeople());
        });
};
