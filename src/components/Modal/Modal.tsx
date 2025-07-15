import type { FC, ReactNode } from 'react';
import { Portal } from '@/components/Portal/Portal';
import styles from './Modal.module.scss';

interface ModalProps {
  openModal: boolean;
  setOpenModal: (open: boolean) => void;
  children: ReactNode;
}

export const Modal: FC<ModalProps> = ({
  openModal,
  setOpenModal,
  children,
}) => {
  const closeModal = () => {
    setOpenModal(false);
  };

  if (!openModal) return null;

  return (
    <Portal>
      <div className={styles.modal} onClick={closeModal}>
        <div
          className={styles.popupActive}
          onClick={(e) => e.stopPropagation()}
        >
          {children}
        </div>
      </div>
    </Portal>
  );
};
