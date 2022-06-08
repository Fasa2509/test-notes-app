import { createContext, useEffect, useState } from "react";

const RouterContext = createContext();

const listPages = {
    main: "Inicio",
    publicNotes: "Notas públicas",
    hashtags: "Hashtags",
}

const RouterProvider = ({ children }) => {
    const [page, setPage] = useState("main");

    useEffect(() => {
        // eslint-disable-next-line no-restricted-globals
        history.pushState({}, '', `/${page}`)
    }, [page])
    
    const data = {
        listPages,
        page,
        setPage
    }

    return <RouterContext.Provider value={data}>{children}</RouterContext.Provider>
};

export { RouterProvider };

export default RouterContext