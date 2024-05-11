import React, { useState } from 'react';
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Box,
  IconButton,
  Button,
  TextField,
  Typography,
  Divider,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Snackbar,
} from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon, Search as SearchIcon, Clear as ClearIcon } from '@mui/icons-material';
import Sidemenu from '../../Sidemenu';

const columns = [
  { id: 'name', label: 'Name', minWidth: 170 },
  { id: 'code', label: 'ID', minWidth: 100 },
  { id: 'username', label: 'Username', minWidth: 170, align: 'right' },
  { id: 'email', label: 'Email', minWidth: 170, align: 'right' },
  { id: 'action', label: 'Action', minWidth: 170, align: 'right' },
];

function createData(name, code, username, email) {
  return { name, code, username, email };
}

// Initial rows of data
const initialRows = [
  createData('Emily Johnson', 'BCS0011', 'emily_johnson', 'emily.johnson@example.com'),
  createData('Michael Smith', 'BCS0012', 'michael_smith', 'michael.smith@example.com'),
  createData('Sarah Williams', 'sarah_williams', 'BCS0013', 'sarah.williams@example.com'),
  createData('David Jones', 'BCS0014', 'david_jones', 'david.jones@example.com'),
  createData('Olivia Taylor', 'BCS0015', 'olivia_taylor', 'olivia.taylor@example.com'),
  createData('James Brown', 'BCS0016', 'james_brown', 'james.brown@example.com'),
  createData('Sophia Garcia', 'BCS0017', 'sophia_garcia', 'sophia.garcia@example.com'),
  createData('Benjamin Martinez', 'BCS0018', 'benjamin_martinez', 'benjamin.martinez@example.com'),
  createData('Mia Rodriguez', 'BCS0019', 'mia_rodriguez', 'mia.rodriguez@example.com'),
  createData('Alexander Lee', 'BCS0020', 'alexander_lee', 'alexander.lee@example.com'),
  createData('Ella Gonzalez', 'BCS0021', 'ella_gonzalez', 'ella.gonzalez@example.com'),
  createData('William Walker', 'BCS0022', 'william_walker', 'william.walker@example.com'),
  createData('Chloe Adams', 'BCS0023', 'chloe_adams', 'chloe.adams@example.com'),
  createData('Ethan White', 'BCS0024', 'ethan_white', 'ethan.white@example.com'),
  createData('Ava Hernandez', 'ava_hernandez', 'BCS0025', 'ava.hernandez@example.com'),
];

export default function AvailabilityList() {
  const [rows, setRows] = useState(initialRows);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRow, setSelectedRow] = useState(null);
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [isEditDialogOpen, setEditDialogOpen] = useState(false);
  const [newSupplier, setNewSupplier] = useState({ name: '', code: '', username: '', email: '' });
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  // Handle page change
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  // Handle rows per page change
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  // Handle search query change
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
    setPage(0);
  };

  // Function to handle edit button click
  const handleEditClick = (row) => {
    setSelectedRow(row);
    setEditDialogOpen(true);
  };

  // Function to handle delete button click
  const handleDeleteClick = (row) => {
    setSelectedRow(row);
    setDialogOpen(true);
  };

  // Handle delete confirmation
  const handleDeleteConfirmation = () => {
    setRows(rows.filter((row) => row.code !== selectedRow.code));
    setDialogOpen(false);
    setSnackbarMessage('Supplier deleted successfully');
    setSnackbarOpen(true);
  };

  // Handle add supplier dialog open
  const handleAddSupplierOpen = () => {
    setNewSupplier({ name: '', code: '', username: '', email: '' });
    setEditDialogOpen(true);
  };

  // Handle form submission for adding or editing a supplier
  const handleFormSubmit = () => {
    if (selectedRow) {
      // Edit existing supplier
      const updatedRows = rows.map((row) =>
        row.code === selectedRow.code ? selectedRow : row
      );
      setRows(updatedRows);
      setSnackbarMessage('Supplier details updated successfully');
    } else {
      // Add new supplier
      setRows([...rows, newSupplier]);
      setSnackbarMessage('New supplier added successfully');
    }
    setEditDialogOpen(false);
    setSnackbarOpen(true);
  };

  // Filtered rows based on search query
  const filteredRows = rows.filter((row) =>
    row.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Box sx={{ display: 'flex' }}>
      <Sidemenu />
      <Box sx={{ flexGrow: 1, p: 3 }}>
        <Typography gutterBottom variant="h5" component="div" sx={{ padding: '20px' }}>
          Supplier List
        </Typography>
        <Divider />

        {/* Search bar */}
        <Box sx={{ marginBottom: 2, position: 'relative' }}>
          <TextField
            label="Search by Name"
            variant="outlined"
            value={searchQuery}
            onChange={handleSearchChange}
            fullWidth
            sx={{
              width: '50%',
              borderRadius: '8px',
              '& .MuiOutlinedInput-root': {
                borderRadius: '8px',
                paddingRight: '10px',
                paddingLeft: '10px',
                fontSize: '14px',
                '&.Mui-focused': {
                  borderColor: 'primary.main',
                },
              },
            }}
            InputProps={{
              startAdornment: (
                <SearchIcon sx={{ color: 'action.active', marginRight: '8px' }} />
              ),
              endAdornment: searchQuery && (
                <IconButton
                  onClick={() => handleSearchChange({ target: { value: '' } })}
                  size="small"
                  sx={{ color: 'action.active' }}
                >
                  <ClearIcon />
                </IconButton>
              ),
            }}
          />
        </Box>

        {/* Table */}
        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
          <TableContainer sx={{ maxHeight: 440 }}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  {columns.map((column) => (
                    <TableCell key={column.id} align={column.align} style={{ minWidth: column.minWidth }}>
                      {column.label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredRows
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => (
                    <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                      {columns.map((column) => {
                        if (column.id === 'action') {
                          return (
                            <TableCell key={column.id} align={column.align}>
                            <IconButton onClick={() => handleEditClick(row)}>
                              <EditIcon />
                            </IconButton>
                            <IconButton onClick={() => handleDeleteClick(row)}>
                              <DeleteIcon />
                            </IconButton>
                          </TableCell>
                        );
                      } else {
                        const value = row[column.id];
                        return (
                          <TableCell key={column.id} align={column.align}>
                            {column.format && typeof value === 'number'
                              ? column.format(value)
                              : value}
                          </TableCell>
                        );
                      }
                    })}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[10, 25, 100]}
            component="div"
            count={filteredRows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>

        {/* Add Supplier Button */}
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginTop: 2 }}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleAddSupplierOpen}
          >
            Add Supplier
          </Button>
        </Box>

        {/* Add or Edit Supplier Dialog */}
        <Dialog open={isEditDialogOpen} onClose={() => setEditDialogOpen(false)}>
          <DialogTitle>{selectedRow ? 'Edit Supplier' : 'Add New Supplier'}</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              label="Name"
              type="text"
              fullWidth
              value={selectedRow ? selectedRow.name : newSupplier.name}
              onChange={(e) => {
                const newValue = e.target.value;
                if (selectedRow) {
                  setSelectedRow({ ...selectedRow, name: newValue });
                } else {
                  setNewSupplier({ ...newSupplier, name: newValue });
                }
              }}
            />
            <TextField
              margin="dense"
              label="ID"
              type="text"
              fullWidth
              value={selectedRow ? selectedRow.code : newSupplier.code}
              onChange={(e) => {
                const newValue = e.target.value;
                if (selectedRow) {
                  setSelectedRow({ ...selectedRow, code: newValue });
                } else {
                  setNewSupplier({ ...newSupplier, code: newValue });
                }
              }}
            />
            <TextField
              margin="dense"
              label="Username"
              type="text"
              fullWidth
              value={selectedRow ? selectedRow.username : newSupplier.username}
              onChange={(e) => {
                const newValue = e.target.value;
                if (selectedRow) {
                  setSelectedRow({ ...selectedRow, username: newValue });
                } else {
                  setNewSupplier({ ...newSupplier, username: newValue });
                }
              }}
            />
            <TextField
              margin="dense"
              label="Email"
              type="text"
              fullWidth
              value={selectedRow ? selectedRow.email : newSupplier.email}
              onChange={(e) => {
                const newValue = e.target.value;
                if (selectedRow) {
                  setSelectedRow({ ...selectedRow, email: newValue });
                } else {
                  setNewSupplier({ ...newSupplier, email: newValue });
                }
              }}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setEditDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleFormSubmit} color="primary">
              {selectedRow ? 'Save' : 'Add'}
            </Button>
          </DialogActions>
        </Dialog>

        {/* Delete Confirmation Dialog */}
        <Dialog open={isDialogOpen} onClose={() => setDialogOpen(false)}>
          <DialogTitle>Confirm Delete</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Are you sure you want to delete this supplier?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleDeleteConfirmation} color="primary">
              Confirm
            </Button>
          </DialogActions>
        </Dialog>

        {/* Snackbar for notifications */}
        <Snackbar
          open={snackbarOpen}
          autoHideDuration={3000}
          onClose={() => setSnackbarOpen(false)}
          message={snackbarMessage}
        />
      </Box>
    </Box>
  );
}
