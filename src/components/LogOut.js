import React from 'react';
import { useNavigate } from "react-router-dom";
import {Button, Chip} from "@mui/material";
import { IconButton } from "@mui/material";
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';


const LogOut = ( authState, setAuthState ) => {
    let navigate = useNavigate();

    const logOut = () => {
        localStorage.removeItem("accessToken");
        navigate('/');
        navigate(0);
    }

    return (
        <div style={{float: "right"}}>
            <IconButton label={authState.authState.username} style={{color: "white", float: "center"}}>
                <Chip label={authState.authState.username} style={{color: "white", backgroundColor: "#000"}}/>
            </IconButton>
            <Button variant="text" className="navbtn logoutbtn" onClick={logOut}>Log Out</Button>
        </div>
    );
};

export default LogOut;