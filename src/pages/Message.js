import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { Typography } from "@mui/material";


const Message = () => {
    let navigate = useNavigate();
    const { id } = useParams();
    const [message, setMessage] = useState();

    useEffect(() => {
        axios.get(`https://itransition-task5.herokuapp.com/messages/byId/${id}`).then((response) => {
            if (response.data.error) navigate("*");
            setMessage(response.data);
        });
    }, [id, navigate]);

    console.log(message);

    if (!message) {
        return(<></>)
    } else {
        return (
            <div className="messageContainer">
                <Typography className="msg-item msg-from" variant="h4">
                    <span style={{fontSize: '1rem'}}>From:</span> {message.fromUsername}
                </Typography>
                <Typography className="msg-item msg-topic" variant="subtitle2">
                <span style={{fontSize: '1rem'}}>Topic:</span> {message.topic}
                </Typography>
                <Typography className="msg-item msg-text" variant="body1">
                    {message.text}
                </Typography>
            </div>
        );
    }
};

export default Message;