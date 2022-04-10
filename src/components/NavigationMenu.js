import React from 'react';
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";


const NavigationMenu = ( authState ) => {
    let navigate = useNavigate();

    const gohomePage = () => {
        navigate('/');
    };

    const login = () => {
        navigate("/login");
    };

    const register = () => {
        navigate("/register");
    }

    const writeMessage = () => {
        navigate("/write-message")
    }

    return (
        <div>
            
            {!authState.authState.status ? (
                <>
                    <Button variant="text" className="navbtn" onClick={register}>Sign Up</Button>
                    <Button variant="text" className="navbtn" onClick={login}>Log In</Button>
                </>
            ) : (
                <>
                    <Button variant="text" className="navbtn" onClick={gohomePage}>Home Page</Button>
                    <Button variant="text" className="navbtn" onClick={writeMessage}>Write</Button>
                </>
            )
            }
        </div>
    );
};

export default NavigationMenu;