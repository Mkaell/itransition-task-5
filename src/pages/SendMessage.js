import React, { useContext, useEffect, useState } from 'react';
import * as Yup from 'yup';

import { useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { AuthContext } from "../context/AuthContext";
import axios from 'axios';
import io from 'socket.io-client';

let socket;

const SendMessage = () => {
    
    const { authState } = useContext(AuthContext);

    let navigate = useNavigate();

    const initialValues = {
        topic: "",
        username: "",
        text: "",
    }

    const validationSchema = Yup.object().shape({
        topic: Yup.string().required(),
        username: Yup.string().required(),
        text: Yup.string().required()
    })

    useEffect(() => {
        socket = io("https://itransition-task5.herokuapp.com/")
    }, []);

    useEffect(() => {
        axios.get("https://itransition-task5.herokuapp.com/users/auth", {
            headers: {
                accessToken: localStorage.getItem("accessToken"),
            }
        }).then((response) => {
            if (response.data.error) {
                localStorage.removeItem("accessToken");
                navigate("/login");
            }
        })
    }, []);

    const onSubmit = (data) => {
  
        data.fromUserId = authState.id;
        data.fromUsername = authState.username;

        let userForApi = {
            username: ""
        };       
        const usernames = data.username.split(",")

        usernames.forEach(async (value) => {
            const dataForApi = Object.assign({},data);
            userForApi.username = value.trim();

            await axios.post("https://itransition-task5.herokuapp.com/users/userByUsername", userForApi)
                .then(async (response) => {
                if (!response.data.error) {
                    dataForApi.forUsername = response.data.username;
                    dataForApi.forUserId = response.data.id;
                    await axios.post("https://itransition-task5.herokuapp.com/messages/write-message", dataForApi)
                        .then((response) => {
                            if (response.data.error) {
                                alert(response.data.error);
                            } else {
                                dataForApi.id = response.data.id;

                                socket.emit("sendMessage", dataForApi);
                            }
                        });
                        navigate("/");
                } else {
                    alert(response.data.error);
                }
            });
        })
    }

    return (
        <div className="writeMessage">
            <Formik initialValues={initialValues}
                    onSubmit={onSubmit}
                    validationSchema={validationSchema}>
                <Form>
                    <ErrorMessage name="nameOrEmail" component="span"/>
                    <Field
                        autoComplete="off"
                        id="writeMessageFormField"
                        name="username"
                        placeholder="Enter username to send" />
                    <ErrorMessage name="password" component="span"/>
                    <Field
                        autoComplete="off"
                        id="writeMessageFormField"
                        name="topic"
                        placeholder="Enter a topic for your message"/>
                    <Field
                        as='textarea'
                        autoComplete="off"
                        id="writeMessageFormField"
                        name="text"
                        placeholder="Enter your message"/>
                    <button type="submit" className="submitbtn">Send message</button>
                </Form>
            </Formik>
        </div>
    );
};

export default SendMessage;