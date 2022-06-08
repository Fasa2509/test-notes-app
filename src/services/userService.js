import axios from "axios";
const baseUrl = "https://fasa-notes-app.herokuapp.com/api/users";

const createUser = async (data) => {
    try {
        const accepted = await axios.post(baseUrl, data)

        console.log(accepted)
        return accepted.data
    } catch(error) {
        return error.response.data
    }
}

export {
    createUser
}