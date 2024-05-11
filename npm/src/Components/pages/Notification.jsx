import React from 'react';
import MaxWidthDialog from './MaxWidthDialog';

const Notification= ({ formData, open, handleClose }) => {
    return (
        <div>
            <MaxWidthDialog formData={formData} open={open} handleClose={handleClose} />
        </div>
    );
};

export default Notification;
