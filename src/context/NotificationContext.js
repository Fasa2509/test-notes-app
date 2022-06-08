import { createContext, useState } from "react";

const NotificationContext = createContext();

const NotificationProvider = ({ children }) => {
    const [active, setActive] = useState(false);
    const [notification, setNotification] = useState({});
    const [fixedLoader, setFixedLoader] = useState(false);

    const closeNotification = () => setActive(false);

    const openNotification = (data) => {
        setNotification(data)
        setActive(true)
    };

    const openFixedLoader = () => setFixedLoader(true);

    const closeFixedLoader = () => setFixedLoader(false);
    
    const data = {
        active,
        closeNotification,
        openNotification,
        notification,
        fixedLoader,
        openFixedLoader,
        closeFixedLoader,
    }

    return <NotificationContext.Provider value={data}>{children}</NotificationContext.Provider>
}

export { NotificationProvider };

export default NotificationContext;