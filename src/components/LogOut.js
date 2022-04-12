import React, { useContext } from 'react';
import { useNavigate } from "react-router-dom";
import {Button, Chip} from "@mui/material";
import { IconButton } from "@mui/material";
import { AuthContext } from "../context/AuthContext";

const LogOut = ( authState ) => {

    let navigate = useNavigate();
    const {  setAuthState } = useContext(AuthContext);

    const logOut = () => {
        localStorage.removeItem("accessToken");
        navigate('/login');
        setAuthState({
            username: "",
            id: 0,
            status: false
        })
    }

    return (
        <div>
            <IconButton label={authState.authState.username} style={{color: "white", float: "center"}}>
                <Chip label={authState.authState.username} style={{color: "white", backgroundColor: "#000", borderRadius: '10px'}}/>
            </IconButton>
            <Button variant="text" className="navbtn logoutbtn" onClick={logOut}>Log Out</Button>
        </div>
    );
};

export default LogOut;