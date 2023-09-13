// notification.ts

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const showNotification = (message: string, type: boolean) => {
  if (type) {
    toast.success(message, { position: 'top-right' });
  } else {
    toast.info(message, { position: 'top-right' });
  }
  
};
