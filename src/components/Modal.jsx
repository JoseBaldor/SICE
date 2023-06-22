import "./Modal.css"

const Modal =({children, isOpen, closeModal})=> {
    const handleModalContainerClick = e => e.stopPropagation();
  return (
    <div className= {`modal ${isOpen && "is-open"}`}>
        <div className="modal-container" onClick={handleModalContainerClick}>
            <p>Selecciona un Coordinador</p>
            <button className="modal-close" onClick={closeModal}> X </button>
            {children}
        </div>
    </div>
  )
}

export default Modal;
