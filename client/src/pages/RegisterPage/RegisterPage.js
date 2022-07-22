import React from "react";
import moment from "moment";
import {Formik} from 'formik';
import * as Yup from 'yup';
import {registerUser} from "../../actions/user-actions";
import {useDispatch} from "react-redux";
import {
    Form,
    Input,
    Button,
    Typography
} from 'antd';

function RegisterPage(props) {
    const dispatch = useDispatch();
    return (
        <Formik
            initialValues={{
                email: '',
                name: '',
                password: '',
                confirmPassword: ''
            }}
            validationSchema={Yup.object().shape({
                name: Yup.string()
                    .required('Name is required'),
                email: Yup.string()
                    .email('Email is invalid')
                    .required('Email is required'),
                password: Yup.string()
                    .min(6, 'Password must be at least 6 characters')
                    .required('Password is required'),
                confirmPassword: Yup.string()
                    .oneOf([Yup.ref('password'), null], 'Passwords must match')
                    .required('Confirmation is required')
            })}
            onSubmit={(values, {setSubmitting}) => {
                setTimeout(() => {

                    let dataToSubmit = {
                        email: values.email,
                        password: values.password,
                        name: values.name,
                        image: `http://gravatar.com/avatar/${moment().unix()}?d=identicon`
                    };

                    dispatch(registerUser(dataToSubmit)).then(response => {
                        if (response.payload.success) {
                            props.history.push("/sign-in");
                        } else {
                            console.log(response.payload.err.errmsg)
                        }
                    })

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
                    handleSubmit
                } = props;
                return (
                    <div className={'form'}>
                        <Typography.Title level={2}>Sign Up</Typography.Title>
                        <form onSubmit={handleSubmit}>

                            <Form.Item required>
                                <Input
                                    id="name"
                                    placeholder="Enter your name"
                                    type="text"
                                    value={values.name}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    className={
                                        errors.email && touched.email && 'error'
                                    }
                                />
                                {errors.name && touched.name && (
                                    <div className="input-feedback">{errors.name}</div>
                                )}
                            </Form.Item>

                            <Form.Item required validateStatus={errors.email && touched.email ? "error" : 'success'}>
                                <Input
                                    id="email"
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

                            <Form.Item required validateStatus={errors.password && touched.password ? "error" : 'success'}>
                                <Input
                                    id="password"
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

                            <Form.Item required hasFeedback>
                                <Input
                                    id="confirmPassword"
                                    placeholder="Confirm password"
                                    type="password"
                                    value={values.confirmPassword}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    className={
                                        errors.email && touched.email && 'error'
                                    }
                                />
                                {errors.confirmPassword && touched.confirmPassword && (
                                    <div className="input-feedback">{errors.confirmPassword}</div>
                                )}
                            </Form.Item>

                            <Button onClick={handleSubmit} type="primary" disabled={isSubmitting} className={'form-button'}>
                                Sign Up
                            </Button>
                        </form>
                    </div>
                );
            }}
        </Formik>
    );
};


export default RegisterPage
