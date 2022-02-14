import React, { useState } from 'react';
import { Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { app as action } from '../../store/actions/app';
import AddContact from '../add-contact';

import peroIcon from '../../assets/images/iconPero.png';
import deleteIcon from '../../assets/images/icons8-delete-64.png';
import searchIcon from '../../assets/images/icons8-search-50.png';

import './contact-list.scss';

const ContactList = () => {
    const dispatch = useDispatch();

    const [searchWord, setSearchWord] = useState('');

    const validationSchema = Yup.object().shape({
        status: Yup.string(),
    });

    const peopleList = useSelector((state) => state.app.people);
    const currentPage = useSelector((state) => state.app.currentPage);
    const pageSize = useSelector((state) => state.app.pageSize);
    const editContact = useSelector((state) => state.app.editContact);

    const onDeleteContact = (id) => dispatch(action.deleteContact(id));
    const onRedoContact = (id) => { dispatch(action.editContact(id)); };
    const onSaveStatus = (item, values) => {
        dispatch(action.saveStatus(item, values.status));
        dispatch(action.editContact());
    };

    const onSearchChange = (e) => {
        setSearchWord(e.target.value);
    };

    const search = (items, term) => {
        if (searchWord.length === 0) return items;
        return items.filter((item) => item.name.toLowerCase()
            .indexOf(term.toLowerCase()) > -1);
    };

    const filteredList = search(peopleList, searchWord);
    const itemsPage = filteredList.slice((currentPage - 1) * pageSize, currentPage * pageSize);
    const visibleList = searchWord ? filteredList : itemsPage;

    const renderContact = () => (
        <div className="Contact">
            {visibleList.map((item) => {
                const {
                    name, id, avatar, status,
                } = item;
                return (
                    <div className="contact" key={id}>
                        <div className="contact-imag-wrapper">
                            <div className="image-wrapper">
                                <img className="contact-image" src={avatar} alt="contactImage" />
                            </div>

                            <div className="contact-information">
                                <div className="contact-name">
                                    {name}
                                </div>

                                <div className="status-wrapper">
                                    <Formik
                                        initialValues={{
                                            status: status || '',
                                        }}
                                        validationSchema={validationSchema}
                                        onSubmit={(values) => onSaveStatus(item, values)}
                                    >
                                        {({ handleSubmit }) => (
                                            <Form onSubmit={handleSubmit}>
                                                <Field
                                                    className="status"
                                                    type="text"
                                                    style={{ border: id === editContact && '0.5px solid #1E94E9' }}
                                                    disabled={id !== editContact}
                                                    id="status"
                                                    name="status"
                                                />
                                                {
                                                    id === editContact && (
                                                        <button type="submit" className="btn-submit">
                                                            Сохранить
                                                        </button>
                                                    )
                                                }
                                            </Form>
                                        )}
                                    </Formik>
                                </div>
                            </div>
                        </div>

                        <div className="contact-btn-wrapper">
                            <button className="red-contact" type="button" onClick={() => onRedoContact(id)}>
                                <img src={peroIcon} alt="delete" />
                            </button>

                            <button className="delete-contact" type="button" onClick={() => onDeleteContact(id)}>
                                <img src={deleteIcon} alt="delete" />
                            </button>
                        </div>
                    </div>
                );
            })}
        </div>
    );

    const renderSearchPanel = () => (
        <div className="search-panel">
            <input
                className="search-input"
                placeholder="Введите имя контакта"
                onChange={onSearchChange}
                value={searchWord}
            />

            <button type="button" onClick={() => {}} className="search-btn">
                <img src={searchIcon} alt="search" className="search-icon" />
            </button>
        </div>
    );

    return (
        <div className="Contact-list-wrapper">

            {renderSearchPanel()}
            <AddContact />

            <div className="contacts-wrapper">
                {renderContact()}
            </div>
        </div>
    );
};

export default ContactList;
