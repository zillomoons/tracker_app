import { PropsWithChildren, useEffect } from 'react';
import { createPortal } from 'react-dom';

type ModalTypes = PropsWithChildren & {
  isOpened: boolean;
  onClose: () => void;
};

export const Modal = ({ children, isOpened, onClose }: ModalTypes) => {
  useEffect(() => {
    if (isOpened) {
      document.getElementById('root')!.style.overflow = 'hidden';
    } else {
      document.getElementById('root')!.style.overflow = 'unset';
    }
  }, [isOpened]);
  if (!isOpened) return null;
  return createPortal(
    <>
      <div className='overlay' />
      <div className='modal'>
        <span className='close-button' onClick={onClose}>
          X
        </span>
        <div className='modal-content'>{children}</div>
      </div>
    </>,
    document.getElementById('modal')!
  );
};
