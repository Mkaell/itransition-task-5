import React from 'react';
import {Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from 'yup';
import axios from 'axios'
import { useNavigate } from "react-router-dom";

const SignUp = () => {

    let history = useNavigate();

    const initialValues = {
        email:"",
        username:"",
        password:"",
    };

    const validationSchema = Yup.object().shape({
        email: Yup.string().email("Wrong input").required("E-Mail is required."),
        username: Yup.string().required("Username is required."),
        password: Yup.string().required("Password is required."),
    });

    const onSubmit = (data) => {
        axios.post("https://itransition-task5.herokuapp.com/users/register", data).then((response) => {
            if (response.data.error) {
                alert(response.data.error);
            } else {
                history("/login");
            }
        })
    };

    return (
        <div className="loginPage">
            <h2 className='loginPage-title'>Sign Up</h2>
            <Formik
                initialValues={initialValues}
                onSubmit={onSubmit}
                validationSchema={validationSchema}>
                <Form className="registerForm">
                    <ErrorMessage name="email" component="span"/>
                    <Field
                        autoComplete="off"
                        id="registerFormEmailField"
                        name="email"
                        placeholder="Enter your e-mail" />
                    <ErrorMessage name="username" component="span"/>
                    <Field
                        autoComplete="off"
                        id="registerFormUserNameField"
                        name="username"
                        placeholder="Enter username" />
                    <ErrorMessage name="password" component="span"/>
                    <Field
                        autoComplete="off"
                        type="password"
                        id="registerFormPasswordField"
                        name="password"
                        placeholder="Password"/>
                    <button type="submit" className="submitbtn">Register</button>
                </Form>
            </Formik>
        </div>
    );
};

export default SignUp;