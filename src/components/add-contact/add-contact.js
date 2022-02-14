import React, { useState } from 'react';
import { Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import { app as actions } from '../../store/actions/app';

import './add-contact.scss';

const AddContact = () => {
    const dispatch = useDispatch();

    const [isVisible, setVisible] = useState(false);

    const validationSchema = Yup.object().shape({
        name: Yup.string(),
        status: Yup.string(),
        avatar: Yup.string(),
    });

    const onSubmit = (values) => {
        if (values) {
            dispatch(actions.addContact({
                name: values.name,
                status: values.status,
                avatar: values.avatar,
                id: Math.random(),
            }));
        }
        setVisible(!isVisible);
    };
    return (
        <div className="Add-contact">
            <div className="add-contact-btn-wrapper">
                <button className="add-contact-btn" type="button" onClick={() => setVisible(!isVisible)}>Добавить контакт</button>
            </div>

            {
                isVisible && (
                    <Formik
                        initialValues={{
                            name: '',
                            status: '',
                            avatar: '',
                        }}
                        validationSchema={validationSchema}
                        onSubmit={onSubmit}
                    >
                        {({ handleSubmit }) => (
                            <Form onSubmit={handleSubmit}>
                                <div className="add-contact-input-wrapper">
                                    <div className="input-wrapper">
                                        <div className="label">Добавьте имя</div>
                                        <Field
                                            className="input"
                                            type="text"
                                            placeholder="Имя"
                                            id="name"
                                            name="name"
                                        />
                                    </div>
                                    <div className="input-wrapper">
                                        <div className="label">Добавьте статус</div>
                                        <Field
                                            className="input"
                                            type="text"
                                            placeholder="Статус"
                                            id="status"
                                            name="status"
                                        />
                                    </div>
                                    <div className="input-wrapper">
                                        <div className="label">Добавьте ссылку на аватар</div>
                                        <Field
                                            className="input"
                                            type="text"
                                            placeholder="Аватар"
                                            id="avatar"
                                            name="avatar"
                                        />
                                    </div>

                                    <div className="add-contact-btn-wrapper">
                                        <button className="add-contact-btn" type="submit">Сохранить</button>
                                    </div>
                                </div>

                            </Form>
                        )}
                    </Formik>
                )
            }
        </div>
    );
};

export default AddContact;
