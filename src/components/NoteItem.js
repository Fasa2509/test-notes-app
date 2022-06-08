import { useContext } from 'react';
import UserContext from '../context/UserContext';
import Modal from './Modal';
import './NoteContainer.css';
import NoteImage from './NoteImage';
import { deleteNote } from '../services/noteService';
import NotificationContext from '../context/NotificationContext';

const NoteItem = ({ note }) => {
    const { user, setForm } = useContext(UserContext);
    const { openNotification } = useContext(NotificationContext);

    const { title, content, hashtags, date, edited, image } = note
    const { username } = note.user, noteID = note.id
    const publico = note.public

    const handleAction = async (act) => {
        if (act === 'put') {
            setForm({ noteID, title, content, public: publico, hashtags, method: "PUT", file: null })
        } else if (act === 'del') {
            let del = window.confirm(`¿Quieres eliminar la nota "${title}"?`), res = null

            if (del) {
                res = await deleteNote(noteID, user.token)

                openNotification(res)
            }
        } else {
            console.log('No realizas ninguna accion')
        }
    }

    return(
        <div className='note__item'>
            <div className='note__tags'>
                <h3 className='note__title'>{title}</h3>
                { (hashtags && hashtags.length > 0) && <div className='note__hashtags'>{hashtags.map((tag, index) => <span key={index}>#{tag}</span>)}</div> }
            </div>
            <div className='note__info'>
                <Modal>
                    <h3 className='modal__title'>{title}</h3>
                    <hr className='modal__separator' />
                    {edited !== 0 && <span><b>{edited <= 3 ? "Editado" : "Editado varias veces"}</b></span>}

                    <div className='modal__elements'>
                        {image && <NoteImage image={image} />}

                        <p>{content}</p>
                    </div>
                </Modal>
                <span className='note__date'>Creada el: {new Date(date).toLocaleDateString()}</span>
                { (user.username === username) &&
                    <div>
                        <a href='#note__form' className='note__action' onClick={() => handleAction('put')}>Editar</a>
                        <button className='note__action' onClick={() => handleAction('del')}>Eliminar</button>
                    </div>
                }
            </div>
        </div>
    )
};

export default NoteItem;