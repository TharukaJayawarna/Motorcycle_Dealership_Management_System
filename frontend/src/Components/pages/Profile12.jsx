import React, { useState } from 'react';
import Sidemenu from '../Sidemenu';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { styled } from '@mui/system';

const ProfileHeader = styled(Box)({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '16px',
});

const ProfileDetails = styled(Box)({
    padding: '16px',
});

const ProfileAvatar = styled(Avatar)({
    width: 80,
    height: 80,
    marginRight: '16px',
});

const StyledPaper = styled(Paper)({
    padding: '16px',
    marginBottom: '16px',
});

const SupplierProfile = () => {
    // Define state for supplier data and errors
    const [supplierData, setSupplierData] = useState({
        name: 'John Doe',
        email: 'johndoe@example.com',
        phone: '123-456-7890',
        company: 'ABC Supplies',
        address: '123 Main St, City, Country',
        description: 'We provide the best supplies in the region. Our products are top-notch and reliable.',
        products: ['Product 1', 'Product 2', 'Product 3'],
    });

    const [errors, setErrors] = useState({});

    // State for edit form dialog visibility
    const [isEditDialogOpen, setEditDialogOpen] = useState(false);

    // State for delete confirmation dialog visibility
    const [isDeleteDialogOpen, setDeleteDialogOpen] = useState(false);

    // Handle input changes
    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setSupplierData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    // Handle opening the edit dialog
    const handleEditButtonClick = () => {
        setEditDialogOpen(true);
    };

    // Handle closing the edit dialog
    const handleEditDialogClose = () => {
        setEditDialogOpen(false);
    };

    // Handle opening the delete dialog
    const handleDeleteButtonClick = () => {
        setDeleteDialogOpen(true);
    };

    // Handle closing the delete dialog
    const handleDeleteDialogClose = () => {
        setDeleteDialogOpen(false);
    };

    // Handle saving the edited data
    const handleSaveEditedData = () => {
        // Perform validation before saving
        const validationErrors = validateForm(supplierData);
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        // If validation passes, save the edited data
        setEditDialogOpen(false);
    };

    // Handle confirming the deletion
    const handleDeleteProfile = () => {
        // Reset supplierData state or handle data deletion appropriately
        setSupplierData({
            name: '',
            email: '',
            phone: '',
            company: '',
            address: '',
            description: '',
            products: [],
        });
        setDeleteDialogOpen(false);
    };

    // Function to validate the form inputs
    const validateForm = (data) => {
        const errors = {};

        // Validate email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!data.email) {
            errors.email = 'Email is required';
        } else if (!emailRegex.test(data.email)) {
            errors.email = 'Invalid email format';
        }

        // You can add more validation rules for other fields here

        return errors;
    };

    return (
        <Box sx={{ display: 'flex' }}>
            {/* Include the Sidemenu */}
            <Sidemenu />

            {/* Main content area */}
            <Box component="main" sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3 }}>
                <Grid container spacing={3}>
                    {/* Supplier Profile Header */}
                    <Grid item xs={12}>
                        <StyledPaper>
                            <ProfileHeader>
                                <ProfileAvatar
                                    alt="Supplier Profile"
                                    src="https://i.pravatar.cc/300"
                                />
                                <Box>
                                    <Typography variant="h5">{supplierData?.name}</Typography>
                                    <Typography variant="subtitle1">{supplierData?.company}</Typography>
                                </Box>
                            </ProfileHeader>
                        </StyledPaper>
                    </Grid>

                    {/* Supplier Details */}
                    <Grid item xs={12}>
                        <StyledPaper>
                            <ProfileDetails>
                                <Typography variant="h6">Contact Information</Typography>
                                <TextField
                                    label="Email"
                                    name="email"
                                    value={supplierData?.email}
                                    onChange={handleInputChange}
                                    fullWidth
                                    margin="normal"
                                    disabled={!isEditDialogOpen}
                                    error={!!errors.email}
                                    helperText={errors.email}
                                />
                                <TextField
                                    label="Phone"
                                    name="phone"
                                    value={supplierData?.phone}
                                    onChange={handleInputChange}
                                    fullWidth
                                    margin="normal"
                                    disabled={!isEditDialogOpen}
                                />
                                <TextField
                                    label="Address"
                                    name="address"
                                    value={supplierData?.address}
                                    onChange={handleInputChange}
                                    fullWidth
                                    margin="normal"
                                    disabled={!isEditDialogOpen}
                                />
                                <Divider sx={{ my: 2 }} />

                                <Typography variant="h6">Company Description</Typography>
                                <TextField
                                    label="Description"
                                    name="description"
                                    value={supplierData?.description}
                                    onChange={handleInputChange}
                                    multiline
                                    rows={4}
                                    fullWidth
                                    margin="normal"
                                    disabled={!isEditDialogOpen}
                                />
                            </ProfileDetails>
                        </StyledPaper>
                    </Grid>

                    {/* Actions */}
                    <Grid item xs={12}>
                        <StyledPaper>
                            <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    sx={{ marginRight: '8px' }}
                                    onClick={handleEditButtonClick}
                                >
                                    Edit Profile
                                </Button>
                                <Button
                                    variant="contained"
                                    color="secondary"
                                    sx={{ marginRight: '8px' }}
                                    onClick={handleDeleteButtonClick}
                                >
                                    Delete Profile
                                </Button>
                            </Box>
                        </StyledPaper>
                    </Grid>
                </Grid>

                {/* Edit Profile Dialog */}
                <Dialog open={isEditDialogOpen} onClose={handleEditDialogClose}>
                    <DialogTitle>Edit Supplier Profile</DialogTitle>
                    <DialogContent>
                        {/* Add input fields for editing the supplier profile */}
                        <TextField
                            label="Name"
                            name="name"
                            value={supplierData?.name}
                            onChange={handleInputChange}
                            fullWidth
                            margin="normal"
                        />
                        <TextField
                            label="Email"
                            name="email"
                            value={supplierData?.email}
                            onChange={handleInputChange}
                            fullWidth
                            margin="normal"
                            error={!!errors.email}
                            helperText={errors.email}
                        />
                        <TextField
                            label="Phone"
                            name="phone"
                            value={supplierData?.phone}
                            onChange={handleInputChange}
                            fullWidth
                            margin="normal"
                        />
                        <TextField
                            label="Address"
                            name="address"
                            value={supplierData?.address}
                            onChange={handleInputChange}
                            fullWidth
                            margin="normal"
                        />
                        <TextField
                            label="Company Description"
                            name="description"
                            value={supplierData?.description}
                            onChange={handleInputChange}
                            multiline
                            rows={4}
                            fullWidth
                            margin="normal"
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleEditDialogClose} color="primary">
                            Cancel
                        </Button>
                        <Button onClick={handleSaveEditedData} color="primary">
                            Save
                        </Button>
                    </DialogActions>
                </Dialog>

                {/* Delete Profile Confirmation Dialog */}
                <Dialog open={isDeleteDialogOpen} onClose={handleDeleteDialogClose}>
                    <DialogTitle>Confirm Deletion</DialogTitle>
                    <DialogContent>
                        <Typography>
                            Are you sure you want to delete this supplier profile?
                        </Typography>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleDeleteDialogClose} color="primary">
                            Cancel
                        </Button>
                        <Button onClick={handleDeleteProfile} color="primary">
                            Delete
                        </Button>
                    </DialogActions>
                </Dialog>
            </Box>
        </Box>
    );
};

export default SupplierProfile;
