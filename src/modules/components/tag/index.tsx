import React, { useState, useEffect } from 'react';
import Chip from '@mui/material/Chip';

interface TagProps {
  label: string;
  price: number;
  isEnabled: boolean;
  action: (label: string, price: number, isEnabled: boolean) => void;
}

const Tag: React.FC<TagProps> = ({ label, price, action, isEnabled }) => {
  const [enabled, setEnabled] = useState(false);
  const bgColor = enabled ? '#008000' : '#e0e0e0';
  const textColor = enabled ? '#FFFFFF' : '#000000';

  const handleClick = () => {
    setEnabled(!enabled);
    action(label, price, enabled);
  };

  return (
    <Chip
      label={price > 0 ? `${label} + ₡${price}` : label} // Conditionally display the price
      clickable
      onClick={handleClick}
      sx={{
        backgroundColor: bgColor, // Grayed out when disabled
        color: textColor, // Text color
        borderRadius: '4px',
        padding: '2px 2px',
        margin: '2px 3px',
        fontWeight: 'bold',
        fontSize: '12px',
        cursor: 'pointer',
        '&:hover': {
          backgroundColor: enabled ? bgColor : '#008000', // Change the background color when hovered
          color: enabled ? textColor : '#FFFFFF',
        },
      }}
    />
  );
};

export default Tag;
