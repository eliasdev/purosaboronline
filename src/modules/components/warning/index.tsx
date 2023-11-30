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
      const currentHour = currentDate.getUTCHours() - 6; // Adjust for GMT-6 timezone

      if (
        (currentDay === 4 || currentDay === 5 || currentDay === 6) &&
        currentHour >= 17 && // 5:00pm
        currentHour < 21 // 9:00pm
      ) {
        // Calculate the time until 9:00pm
        const minutesUntilNine = 60 - currentDate.getMinutes();
        const hoursUntilNine = 20 - currentHour; // 9:00pm is at the 20th hour

        if (hoursUntilNine > 0) {
          setMessage(`Última orden en: ${hoursUntilNine} horas y ${minutesUntilNine} minutos`);
        } else {
          setMessage(`Última orden en: ${minutesUntilNine} minutos`);
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
