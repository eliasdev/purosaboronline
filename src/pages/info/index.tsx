import React from 'react';
import { Typography, Box, Divider } from '@mui/material';

function Contact() {
  return (
    <Box p={3}>
      <Typography variant="h4" gutterBottom>
        Contact Us
      </Typography>
      <Typography variant="body1" paragraph>
        For orders and inquiries, please reach out to us:
      </Typography>
      <Box>
        <Typography variant="body1">
          <strong>Phone:</strong> +123 456 7890
        </Typography>
        <Typography variant="body1">
          <strong>Schedule:</strong> Mon-Sat: 10:00 AM - 9:00 PM
        </Typography>
        <Typography variant="body1">
          <strong>Location:</strong> 123 Burger Street, Cityville
        </Typography>
      </Box>
    </Box>
  );
}

export default Contact;
