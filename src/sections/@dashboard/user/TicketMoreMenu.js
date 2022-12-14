import { useRef, useState } from 'react';
import {Link as RouterLink,useNavigate } from 'react-router-dom';
// material
import { Menu, MenuItem, IconButton, ListItemIcon, ListItemText } from '@mui/material';
// component
import Iconify from '../../../components/Iconify';

// ----------------------------------------------------------------------

export default function TicketMoreMenu(props) {
  const navigate = useNavigate();
  console.log(props.ticketc);
  const ref = useRef(null);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <IconButton ref={ref} onClick={() => setIsOpen(true)}>
        <Iconify icon="eva:more-vertical-fill" width={20} height={20} />
      </IconButton>

      <Menu
        open={isOpen}
        anchorEl={ref.current}
        onClose={() => setIsOpen(false)}
        PaperProps={{
          sx: { width: 200, maxWidth: '100%' },
        }}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >

        <MenuItem component={RouterLink} to="/dashboard/showticket" state={props.ticketc} sx={{ color: 'text.secondary' }} >
          <ListItemIcon>
            <Iconify icon="eva:info-fill" width={24} height={24} />
          </ListItemIcon>
          <ListItemText primary="Voir" primaryTypographyProps={{ variant: 'body2' }} />
        </MenuItem>
      </Menu>
    </>
  );
}
