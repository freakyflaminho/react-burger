import { MouseEventHandler } from 'react';
import styles from './modal-overlay.module.css';

type Props = {
  onClick: MouseEventHandler<HTMLElement>;
};

const ModalOverlay = ({ onClick }: Props) => {
  return (
    <div className={styles.overlay} onClick={onClick} data-test="modal-overlay" />
  );
};

export default ModalOverlay;
