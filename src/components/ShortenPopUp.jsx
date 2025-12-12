import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import CreateNewShorten from "./CreateNewShorten.jsx";

const ShortenPopUp = ({ open, setOpen, refetch }) => {

    const handleClose = () => {
        setOpen(false);
    }

    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <div className="flex items-center justify-center h-full w-full">
                <CreateNewShorten setOpen={setOpen} refetch={refetch} />
            </div>
        </Modal>
    )
}
export default ShortenPopUp
