import { useContext } from "react";
import UserContext from "../context/UserContext";
import './Menu.css'
import PageSelector from "./Routes";

const Menu = () => {
    const { user, handleLogout } = useContext(UserContext);

    return(
        <div className="menu__container">
            <input className="menu__checkbox" type="checkbox" />
            <div className="menu__tag"></div>
            <nav className="menu">
                <h3>Fullstack App</h3>
                {user.logged
                ? <div className="menu__button"><button className='button' onClick={handleLogout}>Cerrar Sesion</button></div>
                : <p>Inicia sesion para navegar</p>    
                }
            </nav>
            { user.logged && <PageSelector /> }
        </div>
    )
};

export default Menu;