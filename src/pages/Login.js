import React from 'react';
import {Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from 'yup';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

const Login = () => {
    
    let navigate = useNavigate();

    const initialValues = {
        nameOrEmail: "",
        password: "",
    };

    const validationSchema = Yup.object().shape({
        nameOrEmail: Yup.string().required("Username or E-Mail are required."),
        password: Yup.string().required("Password is required."),
    });

    const onSubmit = (data) => {
        axios.post("https://itransition-task5.herokuapp.com/users/login", data).then((response) => {
            if (response.data.error) {
                alert(response.data.error)
            } else {
                localStorage.setItem("accessToken", response.data);
                navigate("/");
               
            }
        });
    };

    return (
        <div className="loginPage">
            <h2 className='loginPage-title'>Login</h2>
            <Formik
                initialValues={initialValues}
                onSubmit={onSubmit}
                validationSchema={validationSchema}>
                <Form className="loginForm">
                    <Field
                        autoComplete="off"
                        id="loginFormField"
                        name="nameOrEmail"
                        placeholder="Enter username or e-mail" />
                    <ErrorMessage name="nameOrEmail" component="span" style={{color: '#d43232'}}/>
                    <Field
                        autoComplete="off"
                        type="password"
                        id="loginFormPasswordField"
                        name="password"
                        placeholder="Password"/>
                        <ErrorMessage name="password" component="span" style={{color: '#d43232'}}/>
                    <button type="submit" className="submitbtn">Log In</button>
                </Form>
            </Formik>
        </div>
    );
};

export default Login;