import { useContext } from "react";
import UserContext from "../context/UserContext";
import NoteForm from "./NoteForm";
import NoteContainer from "./NoteContainer";
import './Main.css';
import social_media from '../static/social_media.png';
import getLastLogin from "../helpers/getLastLogin";

const Main = () => {
    const { user } = useContext(UserContext);

    return(
        <>
            <main className="main">
                <div className="main__info">
                    <p>Bienvenido {user.username}! Veamos qué hay de nuevo para ti hoy!</p>
                    <p>Tu última conexión fue {getLastLogin(user.lastLogin).hourLogin || `el ${getLastLogin(user.lastLogin).lastLoginDate} a las ${getLastLogin(user.lastLogin).lastLoginTime}`}.</p>
                </div>
                <div className="pic__container main__welcome">
                    <img src={social_media} alt="Social Media" />
                </div>
                <NoteForm />
            </main>
            <NoteContainer myNotes={true} />
        </>
    )
};

export default Main;