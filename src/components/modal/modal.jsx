import { useEffect } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import ModalOverlay from '../modal-overlay/modal-overlay';
import styles from './modal.module.css';

const modalRoot = document.getElementById('modal');

const Modal = ({ title, onClose, children }) => {
  useEffect(() => {
    const handleEscKeydown = e => e.key === 'Escape' && onClose();

    document.addEventListener('keydown', handleEscKeydown);
    return () => document.removeEventListener('keydown', handleEscKeydown);
  }, [onClose]);

  return ReactDOM.createPortal(
    <>
      <div className={styles.modal}>
        <div className={`${styles.header} ml-10 mr-10 mt-10`}>
          <h2 className="text text_type_main-large">
            {title}
          </h2>
          <CloseIcon type="primary" className={styles.closeIcon} onClick={onClose} />
        </div>
        <div className={styles.content}>
          {children}
        </div>
      </div>
      <ModalOverlay onClick={onClose} />
    </>,
    modalRoot);
};

Modal.propTypes = {
  title: PropTypes.string,
  onClose: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};

export default Modal;