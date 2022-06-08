import { useContext, useEffect, useState } from "react";
import { getPublicNotes, getMyNotes } from "../services/noteService";
import './NoteContainer.css';
import NoteItem from "./NoteItem";
import Loader from "./Loader";
import UserContext from "../context/UserContext";

const initialState = []

const NotesContainer = ({ myNotes = false, hashtag = false }) => {
    const { user } = useContext(UserContext);

    const [notes, setNotes] = useState(initialState);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        (async () => {
            setLoading(true)
            const allNotes = myNotes
                ? await getMyNotes(user.token)
                : await getPublicNotes(user.token, hashtag)
            
            setNotes(allNotes)
            setLoading(false)
        })()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [hashtag])

    return(
        <section className={`note__container${!hashtag ? " note__container--no-hashtag" : ""}`}>
            <h2>{myNotes ? "Mis notas" : `Todas las notas${hashtag ? ` de ${hashtag}` : " públicas"}`}</h2>
            { loading && <Loader /> }
            {
                notes.length > 0
                    ? notes.map(note => <NoteItem key={note.id} note={note} />)
                    : <h2>Aun no hay ninguna nota.</h2>
            }
        </section>
    )
};

export default NotesContainer;