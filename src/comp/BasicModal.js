import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import MediaControlCard from './BasicCard';

export default function BasicModal({ handleClose, open, ProductDetail, uid }) {
  const theme = useTheme();

  // Determine screen sizes
  const isLargeScreen = useMediaQuery(theme.breakpoints.up('lg'));
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  // Set the modal width and max height based on screen size
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: isLargeScreen ? 850 : isSmallScreen ? 370 : 500,
    maxHeight: '90vh',  // Set maximum height to 90% of the viewport height
    overflowY: 'auto',  // Enable vertical scrolling if content exceeds the max height
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 3,
  };

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <MediaControlCard uid={uid} detail={ProductDetail} />
        </Box>
      </Modal>
    </div>
  );
}
