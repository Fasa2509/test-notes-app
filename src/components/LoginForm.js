import { useContext, useEffect, useState } from "react";
import NotificationContext from "../context/NotificationContext";
import UserContext from "../context/UserContext";
import { login } from "../services/loginService";

const LoginForm = () => {
    const { handleLogin } = useContext(UserContext);
    const { openNotification, openFixedLoader, closeFixedLoader } = useContext(NotificationContext);
    const [form, setForm] = useState({
        username: "",
        password: "",
        rememberMe: false
    });

    const handleSubmit = async (e) => {
        e.preventDefault()

        openFixedLoader()

        const data = await login(form)
    
        closeFixedLoader()
        
        openNotification(data)

        if (!data.error) {
            handleLogin(data, form.rememberMe)
        }
    }

    useEffect(() => {
        const logged = JSON.parse(window.localStorage.getItem("user"))

        if (logged && logged.logged) {
            handleLogin(logged)
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return(
        <form className="form" onSubmit={(e) => handleSubmit(e)}>
            <h3>Inicia Sesion</h3>

            <div className="form__field">
                <input value={form.username} type="text" name="username" placeholder="Usuario" onChange={(e) => setForm({ ...form, username: e.target.value })} required />
            </div>

            <div className="form__field">
                <input value={form.password} type="password" name="password" placeholder="Clave" onChange={(e) => setForm({ ...form, password: e.target.value })} required />
            </div>

            <div className="form__field" id="rememberMe__div">
                <label htmlFor="rememberMe">Mantener sesión activa:</label>
                <input value={form.rememberMe} id="rememberMe" type="checkbox" name="rememberMe" onChange={(e) => setForm({ ...form, rememberMe: e.target.checked })} />
            </div>

            <div>
                <input className="form__submit" type="submit" value="Enviar" />
            </div>
        </form>
    )
};

export default LoginForm;