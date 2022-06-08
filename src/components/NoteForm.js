import { useContext } from 'react';
import NotificationContext from '../context/NotificationContext';
import UserContext from '../context/UserContext';
import { createNote, uploadImage, updateNote } from '../services/noteService';
import './NoteForm.css';

const formInitialState = {
    title: "",
    content: "",
    public: false,
    file: null,
    hashtags: [],
    method: "POST",
    noteID: null
}

const NoteForm = () => {
    const { user, form, setForm } = useContext(UserContext);
    const { openNotification, openFixedLoader, closeFixedLoader } = useContext(NotificationContext);

    const handleSubmit = async (e) => {
        e.preventDefault()

        let image = null, note = null;

        openFixedLoader()

        // si hay archivo primero intentamos subirlo, denegamos todo si el archivo no se sube
        if (form.file !== null) {
            image = await uploadImage(form.file, user.token)
    
            openNotification(image)
        }

        if (image === null) {
            // si no hay imagen creamos/editamos la nota con la informacion del formulario
            (form.method === "POST")
                ? note = await createNote(form, user.token)
                : note = await updateNote(form.noteID, form, user.token)

        } else if (image && !image.error) {
            // si hay imagen y no hay error creamos/editamos la nota con la info del form y los datos de la imagen
            (form.method === "POST")
                ? note = await createNote({
                ...form,
                image: {
                    imageID: image.imageID,
                    imageName: image.imageName
                }
            }, user.token)
                : note = await updateNote(form.noteID, {
                    ...form,
                    image: {
                        imageID: image.imageID,
                        imageName: image.imageName
                    }
                }, user.token)

        } else if (image && image.error) {
            // si hay imagen pero con error entoces note = image (image deberia ser un error)
            note = image
        }

        closeFixedLoader()
    
        if (!note.error) {
            setForm(formInitialState)
            // eslint-disable-next-line no-restricted-globals
            history.pushState({}, '', "/")
        }

        openNotification(note)
    }

    const handleSelectChange = (e) => {
        if (!e.target.value || e.target.value === "none") return

        (form.hashtags.indexOf(e.target.value) === -1)
            ? setForm({
                ...form,
                hashtags: [...form.hashtags, e.target.value]
            })
            : setForm({
                ...form,
                hashtags: form.hashtags.filter((tag) => tag !== e.target.value)
            })
    }

    return(
        <section id='note__form' className='note__form'>
            <form className="form" onSubmit={handleSubmit}>
                <h3 className="form__title">{(form.method === "POST" ? "Crear" : "Editar")} una nota</h3>
                    
                <div className="form__field">
                    <input value={form.title} type="text" name="title" placeholder="Titulo" onChange={(e) => setForm({ ...form, title: e.target.value })} required />
                </div>

                <div className="form__field">
                    <input value={form.content} type="text" name="content" placeholder="Contenido" onChange={(e) => setForm({ ...form, content: e.target.value })} required />
                </div>

                <div className="form__field" id="public__div">
                    <label htmlFor="public">Publico:</label>
                    <input value={form.public} id="public" type="checkbox" name="public" onChange={(e) => setForm({ ...form, public: e.target.checked })} />
                </div>
                
                <div className="form__field form__field--hashtags">
                    <span><b>#hashtags</b></span>
                    <select name="hashtags" value={form.hashtags} multiple onChange={(e) => handleSelectChange(e)}>
                        <option value="none">--------------------</option>
                        <option value="naturaleza">Naturaleza</option>
                        <option value="personas">Personas</option>
                        <option value="animales">Animales</option>
                        <option value="arquitectura">Arquitectura</option>
                        <option value="tecnologia">Tecnologia</option>
                    </select>
                </div>

                { (form.hashtags.length > 0) && form.hashtags.map((tag, index) => <span key={index} className='form__hashtag'><b>#{tag}</b></span>) }

                <div className="form__field">
                    <input type="file" name="file" accept="image/png, image/jpg, image/jpeg" onChange={(e) => setForm({ ...form, file: e.target.files[0] })} />
                </div>

                <div>
                    <input className="form__submit" type="submit" value="Enviar" />
                    { form.method === "PUT" && <button className='button' onClick={() => setForm(formInitialState)}>Crear</button> }
                </div>
            </form>
        </section>
    )
}

export default NoteForm