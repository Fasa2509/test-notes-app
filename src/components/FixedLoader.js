import './Loader.css';
import Loader from './Loader';
// import { useContext } from 'react';
// import NotificationContext from '../context/NotificationContext';

const FixedLoader = () => {
    return(
        <div className="fixed__loader">
            <Loader />
        </div>
    )
};

export default FixedLoader;