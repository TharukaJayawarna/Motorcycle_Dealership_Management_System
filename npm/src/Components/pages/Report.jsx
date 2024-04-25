import React from 'react' 
import Sidemenu from "../Sidemenu";
import Box from "@mui/material/Box";

export default function Dashboard() {
  return (
    <div>
      <Box height={30}/>
       <Box sx={{ display: 'flex' }}>
      <Sidemenu/>
     <Box component="main"
        sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3 }}>
          <div>Report </div>
      </Box>
     </Box>
    </div>
  )
}
