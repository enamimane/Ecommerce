import React from 'react';
import { Box, useMediaQuery } from '@mui/material';
import Profile from './Profile';
import MobileSection from './MobileSection';

// ==============================|| HEADER - CONTENT ||============================== //

const HeaderContent = () => {
  const matchesXs = useMediaQuery((theme) => theme.breakpoints.down('md'));

  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="flex-end" // Align to the right
      flexGrow={1} // Allow the content to grow and take available space
    >
      {!matchesXs && <Profile />} {/* Move the profile to the right */}
      {matchesXs && <MobileSection />}
    </Box>
  );
};

export default HeaderContent;
