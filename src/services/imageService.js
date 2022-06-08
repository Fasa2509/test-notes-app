import axios from "axios";
const baseUrl = "https://fasa-notes-app.herokuapp.com/files";

const getImage = async (imageName) => {
    try {
        const image = await axios.get(`${baseUrl}/${imageName}`)

        return image.data
    } catch(error) {
        console.log(error)

        return error.response.data
    }
};

export {
    getImage
}