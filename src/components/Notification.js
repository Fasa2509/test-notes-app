import { useEffect } from 'react';
import { useContext } from 'react';
import NotificationContext from '../context/NotificationContext';
import './Notification.css'

const Notification = () => {
    const { closeNotification, notification } = useContext(NotificationContext);

    // si hay un error, la notificacion tomara una clase que le pondra color rojo, de lo contrario tomara una verde
    const classColor = notification.error ? ' notification--error' : ' notification--success'
    const color = notification.error ? ' notification__close--error' : ' notification__close--success'

    // useEffect para que cuando se renderice el componente, le agregue la clase que hace que se deslice hacia abajo
    useEffect(() => {
        setTimeout(() => document.getElementById('notification').classList.add('notification--active'), 1)
    }, [])

    return(
        <article id='notification' className={`notification${classColor}`}>
            <div className="notifitacion__message">
                {notification.message}
            </div>
            <button onClick={closeNotification} className={`notification__close${color}`}>x</button>
        </article>
    )
};

export default Notification;