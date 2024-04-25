import React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Sidemenu from '../Sidemenu'; // Import Sidemenu component
import RestockingRequestForm from './RestockingRequestForm'; // Import RestockingRequestForm

// Styled Paper component for grid items
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

export default function BasicGrid() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        {/* Sidemenu Grid */}
        <Grid item xs={3}>
          <Sidemenu /> {/* Include the Sidemenu component */}
        </Grid>
        
        {/* Main content Grid */}
        <Grid item xs={9}>
          {/* Include the RestockingRequestForm component */}
          <RestockingRequestForm />
        </Grid>
      </Grid>
    </Box>
  );
}
