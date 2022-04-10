import React, {useContext, useEffect, useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import * as Yup from 'yup';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { AuthContext } from "../helpers/AuthContext";
import axios from 'axios';
import io from 'socket.io-client';


let socket;


const WriteMessageForUser = () => {

    const { authState } = useContext(AuthContext);
    const [forUser, setForUser] = useState();
    let history = useNavigate();
    const { userId } = useParams();

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
                history("/login");
            }
        });

        axios.get(`https://itransition-task5.herokuapp.com/users/byId/${userId}`).then((response) => {
            setForUser(response.data);
        });
    }, [history]);

    const initialValues = {
        topic: "",
        text: "",
    }

    const validationSchema = Yup.object().shape({
        topic: Yup.string().required(),
        text: Yup.string().required(),
    })

    const onSubmit = (data) => {
        console.log(data);
        data.fromUserId = authState.id;
        data.fromUsername = authState.username;

        data.forUsername = forUser.username;
        data.forUserId = forUser.id;
        console.log(data);
        axios.post("https://itransition-task5.herokuapp.com/messages/write-message", data)
            .then( async (response) => {
                if (response.data.error) {
                    alert(response.data.error);
                } else {
                    data.id = response.data.id;
                    console.log('send');
                    await socket.emit("sendMessage", data);
                    history("/");
                }
            });
    }

    return (
        <div className="writeMessage">
            <Formik initialValues={initialValues}
                    onSubmit={onSubmit}
                    validationSchema={validationSchema}>
                <Form>
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

export default WriteMessageForUser;