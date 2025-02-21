import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import ModalOverlay from '../modal-overlay/modal-overlay';

import styles from './modal.module.css';

const modalRoot = document.getElementById('modal') as HTMLElement;

type Props = {
  title?: string;
  onClose: () => void;
  children: React.ReactNode;
  headerTextClass?: string;
  contentClass?: string;
};

const Modal = ({ title, onClose, children, headerTextClass, contentClass }: Props) => {
  useEffect(() => {
    const handleEscKeydown = (e: KeyboardEvent) => e.key === 'Escape' && onClose();

    document.addEventListener('keydown', handleEscKeydown);
    return () => document.removeEventListener('keydown', handleEscKeydown);
  }, [onClose]);

  return ReactDOM.createPortal(
    <>
      <div className={styles.modal} data-test="modal">
        <div className={styles.headerSection}>
          <h2 className={headerTextClass || styles.headerText}>
            {title}
          </h2>
          <div data-test="modal-close">
            <CloseIcon type="primary" className={styles.closeIcon} onClick={onClose} />
          </div>
        </div>
        <div className={contentClass || styles.content}>
          {children}
        </div>
      </div>
      <ModalOverlay onClick={onClose} />
    </>,
    modalRoot);
};

export default Modal;
