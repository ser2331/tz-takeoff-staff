import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';
import { Field, Form, Formik } from 'formik';
import { app as actions } from '../../store/actions';
import homeImage from '../../assets/images/Illustration by Alzea.png';

import './login.scss';

const Login = () => {
    const dispatch = useDispatch();

    const isWrong = useSelector((state) => state.app.isWrong);
    const appSize = useSelector((state) => state.app.appSize);

    const mobile = appSize === 'mobile';

    const validationSchema = Yup.object().shape({
        login: Yup.string()
            .min(3, 'Логин слишком короткий')
            .required('Необходимо заполнить!'),
        password: Yup.string()
            .required('Необходимо заполнить!')
            .min(5, 'Пароль слишком короткий'),
    });

    const onSubmit = (values) => {
        dispatch(actions.logIn({
            login: values.login,
            password: values.password,
        }));
    };
    return (
        <div className="Login">
            <div className="Login__content-wrapper">
                <div className="Login__work-zone">
                    <Formik
                        initialValues={{
                            login: '',
                            password: '',
                        }}
                        validationSchema={validationSchema}
                        onSubmit={onSubmit}
                    >
                        {({
                            handleSubmit,
                            errors,
                            touched,
                        }) => (
                            <Form onSubmit={handleSubmit}>
                                <div className="enter">
                                    Вход
                                </div>

                                <div className="input-wrapper">
                                    <div className="label">
                                        Логин:
                                    </div>

                                    <Field
                                        className="input"
                                        type="text"
                                        placeholder="Введите логин"
                                        id="login"
                                        name="login"
                                    />
                                    <div className="errors-wrapper">
                                        {errors.login && <div className="error">{errors.login}</div>}
                                        {touched.login && <div className="error">{touched.login}</div>}
                                    </div>
                                </div>

                                <div className="input-wrapper">
                                    <div className="label">
                                        Пароль:
                                    </div>

                                    <Field
                                        className="input"
                                        type="password"
                                        placeholder="Введите пароль"
                                        id="password"
                                        name="password"
                                    />
                                    <div className="errors-wrapper">
                                        {errors.password && <div className="error">{errors.password}</div>}
                                        {touched.password && <div className="error">{touched.password}</div>}
                                    </div>
                                </div>

                                {isWrong ? <div className="warning">Пожалуйста, проверьте правильность написания логина и пароля.</div> : <div className="warning" />}

                                <button
                                    className="submit"
                                    type="submit"
                                    onClick={handleSubmit}
                                >
                                    Войти
                                </button>
                            </Form>
                        )}
                    </Formik>

                </div>

                {
                    mobile ? '' : (
                        <div className="Login__picture-zone">
                            <img src={homeImage} alt="pic" />
                        </div>
                    )
                }

            </div>
        </div>
    );
};

export default Login;
