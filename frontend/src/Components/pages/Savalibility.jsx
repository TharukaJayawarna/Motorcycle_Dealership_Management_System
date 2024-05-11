import React from 'react';
import Sidemenu from '../Sidemenu';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Avalibilitylist from './Avalibility/Avalibilitylist';
 
export default function Home() {
  return (
    <div>
      <Box height={70} />
      <Box sx={{ display: 'flex' }}>
        <Sidemenu />
        <Box component="main" sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3 }}
        >
            <Avalibilitylist/>
          {/* Include the Register component */}
         </Box>
      </Box>
    </div>
  );
}
