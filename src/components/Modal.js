import useModal from '../hooks/useModal';
import './Modal.css'

const Modal = ({ children, buttonText = "Abrir" }) => {
    const [isOpen, openModal, closeModal] = useModal(false)

    const handleClick = (e) => {
        if (!e.target.matches('.modal__window *')) closeModal()
    }

    return(
        <>
            <button className='button' onClick={openModal}>{buttonText}</button>
            {   isOpen &&
                <article className='modal__window' onClick={handleClick}>
                    <div className='modal__content'>
                        <button className='modal__close__button' onClick={closeModal}>x</button>
                        {children}
                    </div>
                </article>
            }
        </>
    )
}

export default Modal