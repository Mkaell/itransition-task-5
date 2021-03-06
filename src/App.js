import './App.css';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Home from "./pages/Home";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import SendMessage from "./pages/SendMessage";
import SendMessageUser from "./pages/SendMessageUser";
import Message from "./pages/Message";
import ErrorPage from "./pages/ErrorPage";
import LogOut from "./components/LogOut";
import Navigation from "./components/Navigation";
import { useState, useEffect } from 'react';
import { AuthContext } from "./context/AuthContext";
import axios from 'axios';

function App() {

    const [authState, setAuthState] = useState({
        username: "",
        id: 0,
        status: false
    });

    useEffect(() => {

        axios.get("https://itransition-task5.herokuapp.com/users/auth", {
            
            headers: {
                accessToken: localStorage.getItem("accessToken"),
            }
        }).then((response) => {

            if (response.data.error) {
                localStorage.removeItem("accessToken");
                setAuthState({...authState, status: false});
            } else {
                setAuthState({
                    username: response.data.username,
                    id: response.data.id,
                    status: true,
                });
            }
        });

    }, []);

    return (
    <div className="App">
        <AuthContext.Provider value={{authState, setAuthState}}>
            <Router>
                <div className="navBar">
                    <Navigation authState={authState}/>
                    {!authState.status ? (
                        <></>
                    ) : (
                        <LogOut authState={authState}/>
                    )}
                </div>
                <Routes>
                    <Route path="/" element={<Home />}/>
                    <Route path="/message/:id" element={<Message />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<SignUp />} />
                    <Route path="/write-message" element={<SendMessage />} />
                    <Route path="/write-one-user-message/:userId" element={<SendMessageUser />} />
                    <Route path="*" element={<ErrorPage />} />
                </Routes>
            </Router>
        </AuthContext.Provider>
    </div>
    );
}

export default App;
