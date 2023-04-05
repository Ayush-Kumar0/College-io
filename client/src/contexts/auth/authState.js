import { React, useEffect, useState } from "react";
import AuthContext from "./authContext";
import { getToken, setToken, removeToken } from "../../hooks/authToken";


const userExists = async (setLogin) => {
    const exists = await (async function () {
        try {
            const token = getToken('auth-token');
            if (token == null)
                return false;
            else {
                let res = await fetch(`https://localhost:8000/auth/exists`, {
                    method: 'POST',
                    body: JSON.stringify({ 'auth-token': token }),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                if (res.status === 200)
                    return true;
                else
                    return false;
            }
        } catch (err) {
            console.log('Error occured while verifying user');
            return false;
        }
    })();
    if (!exists) {
        removeToken('auth-token');
    }
    setLogin(exists);
}


const AuthState = (props) => {
    const [login, setLogin] = useState(false);
    useEffect(() => {
        userExists(setLogin);
    }, []);
    return (
        <AuthContext.Provider value={[login, setLogin]}>
            {props.children}
        </AuthContext.Provider>
    );
}

export default AuthState;