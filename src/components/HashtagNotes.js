import { useState } from 'react';
import './HashtagNotes.css';
import NotesContainer from './NoteContainer';

const hashes = {
    naturaleza: "nature",
    personas: "people",
    animales: "animals",
    arquitectura: "architecture",
    tecnologia: "tech"
}

const invertHashes = {
    nature: "naturaleza",
    people: "personas",
    animals: "animales",
    architecture: "arquitectura",
    tech: "tecnologia"
}

const HashtagsNotes = () => {
    const [hash, setHash] = useState('');

    const handleNavigate = (e, hashtag) => {
        setHash('')
        setHash(hashes[hashtag])

        const element = document.querySelector(".button__hashtag--active")
        
        if (element) element.classList.remove("button__hashtag--active")

        e.target.classList.add("button__hashtag--active")

        // eslint-disable-next-line no-restricted-globals
        history.pushState({}, '', `/hashtags/${hashtag}`)
    }

    return(
        <>
            <h3 className='section__title'>Hashtags</h3>
            <p>Busca el <b>#hashtag</b> de tu preferencia y filtra las notas por ellos!</p>
            <div className="button__container">
                <button className='button button__hashtag' onClick={(e) => handleNavigate(e, 'naturaleza')}>Naturaleza</button>
                <button className='button button__hashtag' onClick={(e) => handleNavigate(e, 'personas')}>Personas</button>
                <button className='button button__hashtag' onClick={(e) => handleNavigate(e, 'animales')}>Animales</button>
                <button className='button button__hashtag' onClick={(e) => handleNavigate(e, 'arquitectura')}>Arquitectura</button>
                <button className='button button__hashtag' onClick={(e) => handleNavigate(e, 'tecnologia')}>Tecnologia</button>
            </div>
            <div className="pic__container">
                <img src={`https://placeimg.com/640/480/${hash || 'any'}`} alt={hash} />
            </div>
            { hash && <NotesContainer hashtag={invertHashes[hash]} /> }
        </>
    )
};

export default HashtagsNotes;