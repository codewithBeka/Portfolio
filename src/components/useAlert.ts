import { useState } from 'react';

interface Alert {
  show: boolean;
  text: string;
  type: 'success' | 'danger' | 'info' | 'warning'; // Add more types as needed
}

interface ShowAlertProps {
  text: string;
  type?: 'success' | 'danger' | 'info' | 'warning'; // Match types with the Alert interface
}

const useAlert = () => {
  const [alert, setAlert] = useState<Alert>({ show: false, text: '', type: 'danger' });

  const showAlert = ({ text, type = 'danger' }: ShowAlertProps) => 
    setAlert({ show: true, text, type });

  const hideAlert = () => 
    setAlert({ show: false, text: '', type: 'danger' });

  return { alert, showAlert, hideAlert };
};

export default useAlert;