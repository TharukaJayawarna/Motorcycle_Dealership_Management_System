import React, { useState } from 'react';
import Sidemenu from '../Sidemenu';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import jsPDF from 'jspdf';

export default function Home() {
    const [formData, setFormData] = useState({
        itemName: '',
        quantity: '',
        supplier: '',
        supplierID: '',
        invoiceNo: '',
        paymentDetails: '',
    });

    const [quotations, setQuotations] = useState([
        { item: 'Item 1', ID: 'BCS0011', price: '$10', discount: '2.5%', quantity: 200 },
        { item: 'Item 2', ID: 'BCS0058', price: '$15', discount: '2.5%', quantity: 200 },
    ]);

    const [showSnackbar, setShowSnackbar] = useState(false);
    const [selectedQuotation, setSelectedQuotation] = useState(null);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log('Restocking request submitted:', formData);
        // Clear the form data after submission
        setFormData({
            itemName: '',
            quantity: '',
            supplier: '',
            supplierID: '',
            invoiceNo: '',
            paymentDetails: '',
        });
        setShowSnackbar(true);
        setSelectedQuotation(null); // Clear the selected quotation after submission
    };

    const handleQuotationClick = (quotation) => {
        // Set the clicked quotation as the selected quotation
        setSelectedQuotation(quotation);
        // Update form data with selected quotation data
        setFormData({
            itemName: quotation.item,
            quantity: quotation.quantity.toString(),
            supplier: '',
            supplierID: quotation.ID,
            invoiceNo: '',
            paymentDetails: '',
        });
    };

    const handleQuotationChange = (index, event) => {
        const { name, value } = event.target;
        const newQuotations = [...quotations];
        newQuotations[index][name] = value;
        setQuotations(newQuotations);
    };

    const handleQuotationSubmit = (index) => {
        console.log('Quotation submitted:', quotations[index]);
        // Add logic to handle the submitted quotation
    };

    const handleGeneratePDF = () => {
        const doc = new jsPDF();
        
        // Title for the PDF
        doc.text('Quotations', 10, 10);
        
        // Headers for the table
        doc.text('Item', 10, 20);
        doc.text('ID', 60, 20);
        doc.text('Price', 90, 20);
        doc.text('Discount', 120, 20);
        doc.text('Quantity', 150, 20);
        
        // Start filling the table data
        quotations.forEach((quotation, index) => {
            const yPosition = 30 + (index * 10);
            
            doc.text(quotation.item, 10, yPosition);
            doc.text(quotation.ID, 60, yPosition);
            doc.text(quotation.price, 90, yPosition);
            doc.text(quotation.discount, 120, yPosition);
            doc.text(quotation.quantity.toString(), 150, yPosition);
        });

        // Generate the PDF and save it
        doc.save('quotations.pdf');
    };

    const handleCloseSnackbar = () => {
        setShowSnackbar(false);
    };

    return (
        <div>
            <Box height={30} />
            <Box sx={{ display: 'flex' }}>
                <Sidemenu />
                <Box component="main" sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3 }}>
                    <Grid container spacing={3}>
                        <Grid item xs={12} sm={6} md={3}>
                            <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                                <Typography variant="h6">Restocking Request</Typography>
                                <form onSubmit={handleSubmit}>
                                    <TextField
                                        label="Name"
                                        name="itemName"
                                        value={formData.itemName}
                                        onChange={handleInputChange}
                                        fullWidth
                                        margin="normal"
                                    />
                                    <TextField
                                        label="Quantity"
                                        name="quantity"
                                        value={formData.quantity}
                                        onChange={handleInputChange}
                                        fullWidth
                                        margin="normal"
                                    />
                                    <TextField
                                        label="Supplier"
                                        name="supplier"
                                        value={formData.supplier}
                                        onChange={handleInputChange}
                                        fullWidth
                                        margin="normal"
                                    />
                                    <TextField
                                        label="Supplier ID"
                                        name="supplierID"
                                        value={formData.supplierID}
                                        onChange={handleInputChange}
                                        fullWidth
                                        margin="normal"
                                    />
                                    <TextField
                                        label="Invoice No"
                                        name="invoiceNo"
                                        value={formData.invoiceNo}
                                        onChange={handleInputChange}
                                        fullWidth
                                        margin="normal"
                                    />
                                    <TextField
                                        label="Payment Details"
                                        name="paymentDetails"
                                        value={formData.paymentDetails}
                                        onChange={handleInputChange}
                                        fullWidth
                                        margin="normal"
                                    />
                                    <Button
                                        type="submit"
                                        variant="contained"
                                        color="primary"
                                        fullWidth
                                    >
                                        Submit
                                    </Button>
                                </form>
                            </Paper>
                        </Grid>
                        <Grid item xs={12} sm={6} md={6}>
                            <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                                <Typography variant="h6">Quotations</Typography>
                                <Table>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>Item</TableCell>
                                            <TableCell>ID</TableCell>
                                            <TableCell>Price</TableCell>
                                            <TableCell>Discount</TableCell>
                                            <TableCell>Quantity</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {quotations.map((quotation, index) => (
                                            <TableRow
                                                key={index}
                                                onClick={() => handleQuotationClick(quotation)}
                                                style={{ cursor: 'pointer' }}
                                            >
                                                <TableCell>
                                                    <TextField
                                                        name="item"
                                                        value={quotation.item}
                                                        onChange={(e) => handleQuotationChange(index, e)}
                                                    />
                                                </TableCell>
                                                <TableCell>
                                                    <TextField
                                                        name="ID"
                                                        value={quotation.ID}
                                                        onChange={(e) => handleQuotationChange(index, e)}
                                                    />
                                                </TableCell>
                                                <TableCell>
                                                    <TextField
                                                        name="price"
                                                        value={quotation.price}
                                                        onChange={(e) => handleQuotationChange(index, e)}
                                                    />
                                                </TableCell>
                                                <TableCell>
                                                    <TextField
                                                        name="discount"
                                                        value={quotation.discount}
                                                        onChange={(e) => handleQuotationChange(index, e)}
                                                    />
                                                </TableCell>
                                                <TableCell>
                                                    <TextField
                                                        name="quantity"
                                                        value={quotation.quantity}
                                                        onChange={(e) => handleQuotationChange(index, e)}
                                                    />
                                                </TableCell>
                                                <TableCell>
                                                    <Button
                                                        variant="contained"
                                                        color="primary"
                                                        onClick={() => handleQuotationSubmit(index)}
                                                    >
                                                        Submit
                                                    </Button>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                                {/* Generate PDF Button */}
                                <Button
                                    variant="contained"
                                    color="primary"
                                    fullWidth
                                    onClick={handleGeneratePDF}
                                    sx={{ mt: 2 }}
                                >
                                    Generate PDF
                                </Button>
                            </Paper>
                        </Grid>
                        <Snackbar
                            open={showSnackbar}
                            autoHideDuration={3000}
                            onClose={handleCloseSnackbar}
                        >
                            <Alert onClose={handleCloseSnackbar} severity="success">
                                Restocking request submitted successfully!
                            </Alert>
                        </Snackbar>
                    </Grid>
                </Box>
            </Box>
        </div>
    );
}
