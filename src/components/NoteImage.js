const baseUrl = "https://fasa-notes-app.herokuapp.com/files";

const NoteImage = ({ image }) => {
    const { imageName } = image

    const altImg = imageName.split("-fasa-")[1]
    
    return(
        <div className="pic__container">
            <img src={`${baseUrl}/${image.imageName}`} alt={altImg} />
        </div>
    )
};

export default NoteImage;