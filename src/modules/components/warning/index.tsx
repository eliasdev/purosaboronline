import React, { FC, useState, useEffect } from 'react';
import { Snackbar, Alert } from '@mui/material';
import HistoryToggleOffIcon from '@mui/icons-material/HistoryToggleOff';
import { styled } from '@mui/system';

interface FloatingWarningProps {}

const StyledFlickerAlert = styled(Alert)(({ theme }) => ({
  '@keyframes flicker': {
    '0%': {
      opacity: 1,
    },
    '50%': {
      opacity: 0.5,
    },
    '100%': {
      opacity: 1,
    },
  },
  animation: 'flicker 1s infinite',
}));

const FloatingWarning: FC<FloatingWarningProps> = () => {
  const [message, setMessage] = useState<string>("");
  const [open, setOpen] = useState<boolean>(true);

  
  useEffect(() => {
    const updateMessage = () => {
      const currentDate = new Date();
      const currentDay = currentDate.getDay(); // 0 is Sunday, 1 is Monday, ..., 6 is Saturday
      // Use toLocaleTimeString with 'en-US' locale and timeZone option
      const currentHour = new Date().toLocaleTimeString('en-US', { hour: 'numeric', hour12: false, timeZone: 'America/Costa_Rica' });
      if (
        (currentDay === 4 || currentDay === 5 || currentDay === 6) &&
        parseInt(currentHour, 10) >= 17 && // 5:00pm
        parseInt(currentHour, 10) < 21 // 9:00pm
      ) {
        // Calculate the time until 9:00pm
        const minutesUntilNine = 60 - currentDate.getMinutes();
        const hoursUntilNine = 20 - parseInt(currentHour, 10); // 9:00pm is at the 20th hour
  
        if (hoursUntilNine > 0) {
          setMessage(`Ordena antes de: ${hoursUntilNine} hora${hoursUntilNine > 1 ? 's' : ''} y ${minutesUntilNine} minutos`);
        } else {
          setMessage(`Ordena antes de: ${minutesUntilNine} minutos`);
        }
      } else {
        setMessage("");
      }
    };
  
    const intervalId = setInterval(updateMessage, 1000); // Update every second
  
    // Cleanup the interval on component unmount
    return () => clearInterval(intervalId);
  }, []);
  
    

  const handleSnackbarClose = () => {
    setOpen(false);
  };

  return (
    <>
      {message.length > 0 && (
        <Snackbar open={open} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }} onClick={handleSnackbarClose}>
          <StyledFlickerAlert severity="warning" icon={<HistoryToggleOffIcon />}>
            {message}
          </StyledFlickerAlert>
        </Snackbar>
      )}
    </>
  );
};

export default FloatingWarning;
