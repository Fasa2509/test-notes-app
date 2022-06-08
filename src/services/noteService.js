import axios from 'axios';
const noteBaseUrl = 'https://fasa-notes-app.herokuapp.com/api/notes';
const imageBaseUrl = 'https://fasa-notes-app.herokuapp.com/upload';

// metodo que retorna un objeto con la cabecera establecida con el token
const Authorization = (token) => ({
    headers: {
        Authorization: `Bearer ${token}`
    }
})

const getNotes = async () => {
    try {
        const allNotes = await axios.get(noteBaseUrl)
    
        return allNotes.data
    } catch(error) {
        console.log(error)

        return error.response.data
    }
}

const getMyNotes = async (token) => {
    try {
        const response = await axios.get(`${noteBaseUrl}/myNotes`, Authorization(token))

        return response.data
    } catch(error) {
        console.log(error)

        return error.response.data
    }
}

const getPublicNotes = async (token, hashtag = false) => {
    const aborter = new AbortController()

    try {
        const allNotes = (!hashtag) 
            ? await axios.get(`${noteBaseUrl}/publicNotes`, Authorization(token), {
                signal: aborter.signal
            })
            : await axios.get(`${noteBaseUrl}/publicNotes/${hashtag}`, Authorization(token))

        setTimeout(() => {
            aborter.abort()
            return {
                error: true,
                message: 'ocurrió un error al pedir las notas!'
            }
        }, 15000)

        return allNotes.data
    } catch(error) {
        console.log(error)

        return error.response.data
    }
}

const createNote = async (noteInfo, token) => {
    try {
        const response = await axios.post(noteBaseUrl, noteInfo, Authorization(token))

        return response.data
    } catch(error) {
        console.log(error)

        return error.response.data
    }
};

const updateNote = async (noteID, noteInfo, token) => {
    try {
        const response = await axios.put(`${noteBaseUrl}/${noteID}`, noteInfo, Authorization(token))

        return response.data
    } catch(error) {
        console.log(error)

        return error.response.data
    }
};

const deleteNote = async (noteID, token) => {
    try {
        const response = await axios.delete(`${noteBaseUrl}/${noteID}`, Authorization(token))

        return response.data
    } catch(error) {
        console.log(error)

        return error.response.data
    }
}

const uploadImage = async (image, token) => {
    try {
        const formData = new FormData();

        formData.append("file", image)

        const imageResponse = await axios.post(imageBaseUrl, formData, {
            headers: {
                'Authorization': "Bearer " + token,
                'Content-Type': 'multipart/form-data'
            }
        }).then(response => response.data)

        return imageResponse
    } catch(error) {
        console.log(error)

        return error.response.data 
    }
};

export {
    getNotes,
    getMyNotes,
    getPublicNotes,
    createNote,
    updateNote,
    deleteNote,
    uploadImage
};