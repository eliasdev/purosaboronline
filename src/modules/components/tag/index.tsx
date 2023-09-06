import React, { useState, useEffect } from 'react';
import Chip from '@mui/material/Chip';

interface TagProps {
  label: string;
  price: number;
  onTagToggle: (label: string, price: number) => void;
  action: (label: string, price: number) => void;
}

const Tag: React.FC<TagProps> = ({ label, price, onTagToggle, action }) => {
  const [enabled, setEnabled] = useState(false);
  const bgColor = enabled ? '#008000' : '#e0e0e0';
  const textColor = enabled ? '#FFFFFF' : '#000000';

  useEffect(() => {
    // Notify the parent component about tag toggle
    onTagToggle(label, enabled ? price : 0);
  }, [enabled, label, price, onTagToggle]);

  const handleClick = () => {
    setEnabled(!enabled);
  };

  const handleClickAnotherWay = () => {
    action(label, price)
  };

  return (
    <Chip
      label={price > 0 ? `${label} - ₡${price}` : label} // Conditionally display the price
      clickable
      onClick={handleClickAnotherWay}
      sx={{
        backgroundColor: bgColor, // Grayed out when disabled
        color: textColor, // Text color
        borderRadius: '4px',
        padding: '4px 8px',
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
