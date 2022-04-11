import React from 'react';
import { useNavigate } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import axios from "axios";
import io from 'socket.io-client';
import { AuthContext } from "../helpers/AuthContext";
import { List, ListItem, ListItemText } from '@mui/material'
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';

let socket;

const Home = () => {

    const { authState, setAuthState } = useContext(AuthContext);
    const id = authState.id;
    const [listOfMessages, setListOfMessages] = useState([]);
    const [listOfUsers, setListOfUsers] = useState([]);
    
    let navigate = useNavigate();

    useEffect(() => {
        socket = io("https://itransition-task5.herokuapp.com/");

        socket.on("emitSendMessage", (data) => {
            if (data.forUserId === id) {
                data.createdAt = new Date();
                setListOfMessages(prevState => [data, ...prevState]);
            }
        });
    }, [id, setListOfMessages]);


    useEffect(() => {
        axios.get("https://itransition-task5.herokuapp.com/users/auth",
            { headers: { accessToken: localStorage.getItem("accessToken") } })
            .then((response) => {
                if (response.data.error) {
                    localStorage.removeItem("accessToken");
                    setAuthState({...authState, status: false});
                    navigate("/login");
                } else {
                    setAuthState({
                        username: response.data.username,
                        id: response.data.id,
                        status: true,
                    });
                }
            });

        axios.get(`https://itransition-task5.herokuapp.com/messages/${id}`).then((response) => {
            setListOfMessages(response.data.reverse());
        });

        axios.get("https://itransition-task5.herokuapp.com/users").then((response) => {
            setListOfUsers(response.data.reverse());
        })
    }, [setAuthState, id, navigate]);


    return(
        <div style={{display: 'flex', width: '80%', margin: '50px auto 0', justifyContent: 'space-around'}}>
            <div className="usersList-container">
                <h3 className='usersList-title'>Users</h3>
                <List style={{padding: '10px', textAlign: 'center', width: '100%', borderRadius: '10px',  height: '50%'}}>
                    {
                        listOfUsers.map((user, key) => {
                            return (
                                <ListItem className="userItem"
                                        key={key}
                                        onClick={() => {navigate(`/write-one-user-message/${user.id}`)}}>
                                            <PersonOutlineIcon style={{ color: "#750D37" }}/>
                                    <ListItemText primary={user.username} style={{ textAlign: 'center' }}/>
                                </ListItem>
                            )
                        })
                    }
                </List>
            </div>
            <div className="messagesList-container">
                {
                    (listOfMessages.length === 0) ? (
                        <h3 className='messagesList-title'>No messages for you</h3>
                    ) : (
                        <>
                            <h3 className='messagesList-title'>Messages:</h3>
                            <List className="messagesList">
                                {
                                    listOfMessages.map((message, key) => {
                                        return(
                                            <ListItem className="messageItem" key={key}
                                                        disableGutters
                                                        onClick={() => {navigate(`/message/${message.id}`)}}>
                                                <ListItemText primary={message.fromUsername} />
                                                <ListItemText className="messageTopic" primary={message.topic} />
                                                <ListItemText secondary={new Date(message.createdAt).toLocaleString()} className="messageDate" />
                                            </ListItem>
                                        )
                                    })
                                }
                            </List>
                        </>
                )}
            </div>
        </div>
    )
};

export default Home;