import React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Typography from '@mui/material/Typography';
import NotificationsIcon from '@mui/icons-material/Notifications';
import Sidemenu from '../Sidemenu';

class MaxWidthDialog extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            fullWidth: true,
            maxWidth: 'sm',
            formData: {
                supplierID: '',
                supplier: '',
                invoiceNo: '',
                paymentDetails: '',
            },
        };
    }

    // Method to handle data from Home component
    showNotification = (data) => {
        this.setState({
            formData: data,
            open: true,
        });
    };

     

    handleClose = () => {
        this.setState({ open: false });
    };

    render() {
        const { fullWidth, maxWidth, open, formData } = this.state;

        return (
            <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center">
                <Sidemenu />
                <Button
                    variant="outlined"
                    startIcon={<NotificationsIcon />}
                    onClick={this.handleClickOpen}
                >
                    Open Notification
                </Button>
                <Dialog
                    fullWidth={fullWidth}
                    maxWidth={maxWidth}
                    open={open}
                    onClose={this.handleClose}
                    sx={{ textAlign: 'center' }} // Center the notification
                >
                    <DialogTitle>Payment Details</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            <Box sx={{ mt: 1 }}>
                                <Typography variant="body1">
                                    <strong>Supplier ID:</strong> {formData.supplierID}
                                </Typography>
                                <Typography variant="body1">
                                    <strong>Supplier Name:</strong> {formData.supplier}
                                </Typography>
                                <Typography variant="body1">
                                    <strong>Invoice No:</strong> {formData.invoiceNo}
                                </Typography>
                                <Typography variant="body1">
                                    <strong>Payment Details:</strong> {formData.paymentDetails}
                                </Typography>
                            </Box>
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleClose}>Close</Button>
                    </DialogActions>
                </Dialog>
            </Box>
        );
    }
}

export default MaxWidthDialog;
