import { React, useEffect, useState } from "react";
import AuthContext from "./authContext";
import io from 'socket.io-client';

const userExists = async (setLogin, setSocket) => {
    const login = await (async function () {
        try {
            let res = await fetch(`${process.env.REACT_APP_SERVER_URL}/auth/exists`, {
                method: 'POST',
                body: '',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include'
            });
            if (res.status === 200) {
                let data = await res.clone().json();
                return data.user;
            }
            else
                return undefined;
        } catch (err) {
            console.log('Error occured while verifying user');
            return undefined;
        }
    })();
    if (login) {
        setSocket(io(process.env.REACT_APP_SERVER_URL, {
            withCredentials: true
        }));
    } else {
        setSocket(undefined);
    }
    setLogin(login);
}


const AuthState = (props) => {
    const [login, setLogin] = useState(undefined);
    const [socket, setSocket] = useState(undefined);
    useEffect(() => {
        userExists(setLogin, setSocket);
    }, []);

    return (
        <AuthContext.Provider value={[login, setLogin, socket]}>
            {props.children}
        </AuthContext.Provider>
    );
}

export default AuthState;