import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { app as action } from '../../store/actions';
import image from '../../assets/images/Profile-Pic-S.png';
import Pagination from '../pagination';
import ContactList from '../contact-list';

import './contact-list-page.scss';

const ContactListPage = () => {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.app.user);

    useEffect(() => {
        dispatch(action.getPeople());
    }, [dispatch]);

    return (
        <div className="ContactListPage">
            <div className="ContactListPage__profile-info">
                <div className="user-image-wrapper">
                    <img src={user.image ? user.image : image} alt="userImage" className="user-image" />
                </div>

                <div className="user-info-wrapper">
                    <div className="user-firstname">{user.login}</div>
                </div>

                <div className="logOut-wrapper">
                    <button type="button" className="logOut" onClick={() => dispatch(action.logOut())}>
                        Выйти
                    </button>
                </div>
            </div>

            <ContactList />

            <Pagination />

        </div>
    );
};

export default ContactListPage;
