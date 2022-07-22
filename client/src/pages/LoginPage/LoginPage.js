import React, {useState} from "react";
import {withRouter} from "react-router-dom";
import {loginUser} from "../../actions/user-actions";
import {Formik} from 'formik';
import * as Yup from 'yup';
import {Form, Input, Button, Checkbox, Typography} from 'antd';
import {useDispatch} from "react-redux";
import {LockOutlined, UserOutlined} from "@ant-design/icons";

const {Title} = Typography;

function LoginPage(props) {
    const dispatch = useDispatch();
    const rememberMeChecked = !!localStorage.getItem("rememberMe");

    const [formErrorMessage, setFormErrorMessage] = useState('')
    const [rememberMe, setRememberMe] = useState(rememberMeChecked)

    const handleRememberMe = () => {
        setRememberMe(!rememberMe)
    };

    const initialEmail = localStorage.getItem("rememberMe") ? localStorage.getItem("rememberMe") : '';

    return (
        <Formik
            initialValues={{
                email: initialEmail,
                password: '',
            }}
            validationSchema={Yup.object().shape({
                email: Yup.string()
                    .email('Email is invalid')
                    .required('Email is required'),
                password: Yup.string()
                    .min(6, 'Password must be at least 6 characters')
                    .required('Password is required'),
            })}
            onSubmit={(values, {setSubmitting}) => {
                setTimeout(() => {
                    let dataToSubmit = {
                        email: values.email,
                        password: values.password
                    };

                    dispatch(loginUser(dataToSubmit))
                        .then(response => {
                            if (response.payload.loginSuccess) {
                                window.localStorage.setItem('userId', response.payload.userId);
                                if (rememberMe === true) {
                                    window.localStorage.setItem('rememberMe', values.email);
                                } else {
                                    localStorage.removeItem('rememberMe');
                                }
                                props.history.push("/");
                            } else {
                                setFormErrorMessage('Incorrect email or password')
                            }
                        })
                        .catch(err => {
                            setFormErrorMessage('Incorrect email or password')
                            setTimeout(() => {
                                setFormErrorMessage("")
                            }, 3000);
                        });
                    setSubmitting(false);
                }, 500);
            }}
        >
            {props => {
                const {
                    values,
                    touched,
                    errors,
                    isSubmitting,
                    handleChange,
                    handleBlur,
                    handleSubmit,
                } = props;
                return (
                    <div className={'form'}>
                        <Title level={2} className={'form-title'}>Sign In</Title>
                        <form onSubmit={handleSubmit}>
                            <Form.Item required>
                                <Input
                                    id="email"
                                    prefix={<UserOutlined/>}
                                    placeholder="Enter your email"
                                    type="email"
                                    value={values.email}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    className={
                                        errors.email && touched.email && 'error'
                                    }
                                />
                                {errors.email && touched.email && (
                                    <div className="input-feedback">{errors.email}</div>
                                )}
                            </Form.Item>

                            <Form.Item required>
                                <Input
                                    id="password"
                                    prefix={<LockOutlined/>}
                                    placeholder="Enter your password"
                                    type="password"
                                    value={values.password}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    className={
                                        errors.email && touched.email && 'error'
                                    }
                                />
                                {errors.password && touched.password && (
                                    <div className="input-feedback">{errors.password}</div>
                                )}
                            </Form.Item>

                            {formErrorMessage && (
                                <p className={'form-error'}>{formErrorMessage}</p>
                            )}

                            <Form.Item>
                                <Checkbox id="rememberMe" onChange={handleRememberMe} checked={rememberMe}>Remember me</Checkbox>
                                <Button type="primary" htmlType="submit" disabled={isSubmitting} onSubmit={handleSubmit} className={'form-button'}>
                                    Sign In
                                </Button>
                            </Form.Item>
                        </form>
                    </div>
                );
            }}
        </Formik>
    );
};

export default withRouter(LoginPage);


