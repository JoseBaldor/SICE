import { useModal } from "../hooks/useModal";
import Modal from "./Modal";
import "./Modal.css"

const Modals = ({children}) =>{
    const [isOpenModal, openModal, closeModal] = useModal(false);
    return(
        <>
            <div>
                <button className="modal-button" onClick={openModal} > ... </button>
            </div>
            <Modal isOpen = {isOpenModal} closeModal={closeModal}>
                {children}
            </Modal>
        </>
    );
}

export default Modals;