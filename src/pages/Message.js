import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
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

        return (
            <>
            {
                message && 
                    <div className="messageContainer">
                        <Typography className="msg-item msg-from" variant="h4">
                            <span style={{fontSize: '1rem', fontWeight: '700'}}>From:</span> {message.fromUsername}
                        </Typography>
                        <Typography className="msg-item msg-topic" variant="subtitle1">
                        <span style={{fontSize: '1rem', fontWeight: '700'}}>Topic:</span> {message.topic}
                        </Typography>
                        <Typography className="msg-item msg-text" variant="body1">
                            {message.text}
                        </Typography>
                    </div> 
                }
            </>

        );
    
};

export default Message;