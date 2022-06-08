import { createContext, useState } from "react";

const UserContext = createContext();

const userInitialState = {
    logged: false
}

const formInitialState = {
    title: "",
    content: "",
    public: false,
    file: null,
    hashtags: [],
    method: "POST",
    noteID: null
}

const UserProvider = ({ children }) => {
    const [user, setUser] = useState(userInitialState);
    const [form, setForm] = useState(formInitialState);

    const handleLogin = (credentials, remember = false) => {
        setUser(credentials)

        // si el usuario quiere ser recordado, se mantendra su sesion activa en el navegador
        if (remember) window.localStorage.setItem("user", JSON.stringify(credentials))
    };

    const handleLogout = () => {
        setUser(userInitialState)
        window.localStorage.removeItem("user");
    };
    
    const data = {
        user,
        handleLogin,
        handleLogout,
        form,
        setForm,
    }

    return <UserContext.Provider value={data}>{children}</UserContext.Provider>
};

export { UserProvider }

export default UserContext