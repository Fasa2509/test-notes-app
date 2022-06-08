import { useState } from "react";

const useModal = (opened=false) => {
    const [isOpen, setIsOpen] = useState(opened);

    const openModal = () => setIsOpen(true)

    const closeModal = () => setIsOpen(false)

    return [isOpen, openModal, closeModal]
}

export default useModal;