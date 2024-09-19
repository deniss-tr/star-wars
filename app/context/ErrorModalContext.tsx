import React, { createContext, useState, useContext } from 'react';
import ErrorModal from '../components/ErrorModal';
import { ReactNode } from 'react';

interface ModalContextType {
  openModal: (message: string) => void;
  closeModal: () => void;
  modalOpen: boolean;
  errorMessage: string;
}

const defaultModalContext: ModalContextType = {
  openModal: () => {},
  closeModal: () => {},
  modalOpen: false,
  errorMessage: '',
};

const ModalContext = createContext<ModalContextType>(defaultModalContext);

export const useModalContext = () => {
  return useContext(ModalContext);
};

interface ModalProviderProps {
  children: ReactNode;
}

export const ModalProvider: React.FC<ModalProviderProps> = ({ children }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const openModal = (message: string) => {
    setErrorMessage(message);
    setModalOpen(true);
  };

  const closeModal = () => {
    setErrorMessage('');
    setModalOpen(false);
  };

  return (
    <ModalContext.Provider value={{ modalOpen, errorMessage, openModal, closeModal }}>
      {children}
      <ErrorModal show={modalOpen} onClose={closeModal} errorMessage={errorMessage} />
    </ModalContext.Provider>
  );
};
