import React from 'react';
import Sidemenu from '../Sidemenu';
import Box from '@mui/material/Box';
import Register from '../pages/Register'; // Import Register

export default function Home() {
  return (
    <div>
      <Box height={30} />
      <Box sx={{ display: 'flex' }}>
        <Sidemenu />
        <Box
          component="main"
          sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3 }}
        >
          {/* Include the Register component */}
          <Register />
        </Box>
      </Box>
    </div>
  );
}
