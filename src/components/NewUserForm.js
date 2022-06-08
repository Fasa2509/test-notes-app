import { useContext, useState } from "react";
import NotificationContext from "../context/NotificationContext";
import { createUser } from "../services/userService";
import Modal from "./Modal";

const formInitialState = {
    name: "",
    username: "",
    password: ""
}

const NewUserForm = () => {
    const [form, setForm] = useState(formInitialState);

    const { openNotification, openFixedLoader, closeFixedLoader } = useContext(NotificationContext);

    const handleSubmit = async (e) => {
        e.preventDefault()

        openFixedLoader()
        const usuario = await createUser(form)
        closeFixedLoader()

        if (!usuario.error) setForm(formInitialState)

        openNotification(usuario)
    }

    return(
        <section className="form new__user__form">
            <p>¿No tienes una cuenta? Crea una aquí</p>
            <Modal buttonText="Crear Cuenta">
                <form onSubmit={handleSubmit}>
                    <h3>Crear Nuevo Usuario</h3>

                    <div className="form__field">
                        <input value={form.name} type="text" name="name" placeholder="Nombre" onChange={(e) => setForm({ ...form, name: e.target.value })} required autoComplete="off" />
                    </div>

                    <div className="form__field">
                        <input value={form.username} type="text" name="username" placeholder="Usuario" onChange={(e) => setForm({ ...form, username: e.target.value })} required autoComplete="off" />
                    </div>

                    <div className="form__field">
                        <input value={form.password} type="password" name="password" placeholder="Clave" onChange={(e) => setForm({ ...form, password: e.target.value })} required />
                    </div>

                    <div>
                        <input className="form__submit" type="submit" value="Enviar" />
                    </div>
                </form>
            </Modal>
        </section>
    )
};

export default NewUserForm;