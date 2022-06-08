import { useContext, useState } from "react";
import RouterContext from "../context/RouterContext";
import "./Menu.css";

const PageSelector = () => {
    const { listPages, setPage } = useContext(RouterContext);
    const [checkbox, setCheckbox] = useState(false);

    const handleClick = (e, route) => {
        setPage(route)
        const element = document.querySelector(".routes__button--active")
        
        if (element) element.classList.remove("routes__button--active")

        e.target.classList.add("routes__button--active")
    }

    return(
        <div className={`routes__container${ checkbox ? " routes__container--visible" : " routes__container--hidden" }`}>
            <input className="routes__checkbox" type="checkbox" value={checkbox} onChange={(e) => setCheckbox(e.target.checked)} />
            <div className="routes__tag"></div>
            <div className="routes">
                { Object.keys(listPages).map((route, index) => <button key={index} className='routes__button' onClick={(e) => handleClick(e, route)}>{listPages[route]}</button>) }
            </div>
        </div>
    )
}

export default PageSelector;