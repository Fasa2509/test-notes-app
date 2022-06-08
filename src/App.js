import './App.css';
import { useContext } from 'react';
import HashtagsNotes from './components/HashtagNotes';
import LoginForm from './components/LoginForm';
import Main from './components/Main';
import Menu from './components/Menu';
import NewUserForm from './components/NewUserForm';
import NotesContainer from './components/NoteContainer';
import Notification from './components/Notification';
import NotificationContext from './context/NotificationContext';
import RouterContext from './context/RouterContext';
import UserContext from './context/UserContext';
import FixedLoader from './components/FixedLoader';

function App() {
  const { user } = useContext(UserContext);
  const { active, fixedLoader } = useContext(NotificationContext);
  const { page } = useContext(RouterContext);

  return (
    <div className="main__container">
      <Menu />

      { user.logged || <LoginForm /> }

      { user.logged || <NewUserForm /> }

      { (user.logged && page === "main") && <Main /> }

      { (user.logged && page === "publicNotes") && <NotesContainer /> }

      { (user.logged && page === "hashtags") && <HashtagsNotes /> }

      { active && <Notification /> }

      { fixedLoader && <FixedLoader /> }
    </div>
  );
}

export default App;