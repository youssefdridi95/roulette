import { filter } from 'lodash';
import { sentenceCase } from 'change-case';
import { useState,useEffect } from 'react';
import { Link as RouterLink, useNavigate, useLocation} from 'react-router-dom';
// material
import {
  Card,
  Table,
  Box,
  Stack,
  Avatar,
  Button,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Checkbox,
  TableRow,
  TableBody,
  TableCell,
  Container,
  Typography,
  TableContainer,
  TablePagination,
} from '@mui/material';

import { getUser } from '../utils/common';
import servIP from '../ServConf'; 
// components
import Page from '../components/Page';
import Scrollbar from '../components/Scrollbar';
import Iconify from '../components/Iconify';

export default function ShowTicket() {
  
  const location = useLocation();
  const {IdentifiantStore, _id, Bets,Statut, date, payment, TurnID, TicketNumber} = location.state;
  const navigate = useNavigate();
  useEffect(() => {
    const myUser = getUser();
    if(myUser == null)
    navigate("/login");  
  });


  const sumMises = () => {
    let sum = 0;
    for(let i = 0; i<Bets.length; i+=1)
    {
        sum += Bets[i].BetAmount;
    }
    return sum;
  }

  const maxPrixTicket = () => {
    let max = 0;
    for(let i = 0; i<Bets.length; i+=1)
    {
        const ccp = Bets[i].Multiplier * Bets[i].BetAmount;
        if(max < ccp)
         max = ccp;
    }
    return max;
  }

  return (
    <Page title="Ticket">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Ticket
          </Typography>
          <Button variant="contained" component={RouterLink} to="/dashboard/tickets" startIcon={<Iconify icon="akar-icons:arrow-back-thick-fill" />}>
            Retour
          </Button>
        </Stack>

        <Card>

          <Scrollbar>
            <div style={{marginLeft:"2%", display:'flex',flexDirection:"column"}}>
            <Box sx={{ pr: 2 }}>
                <Stack direction="row" alignItems="center" justifyContent="space-between" mb={2} >
                    <Typography variant="h6" >
                    [{IdentifiantStore}] Ticket Id:
                    </Typography>    
                    <Typography variant="h6">
                    {TicketNumber}
                    </Typography>   
                </Stack>
              </Box>
              <Box sx={{ pr: 2 }} mb={3}>
                <Stack direction="row" alignItems="center" justifyContent="space-between" mb={2} >
                    <Typography variant="h6" >
                    Imprimé à :
                    </Typography>    
                    <Typography variant="h6">
                    {date}
                    </Typography>   
                </Stack>
              </Box>
              {
                Bets.map((b) => 
                <Box sx={{ pr: 2 }}>
                    <Stack direction="row" alignItems="center" justifyContent="space-between" mb={2} >
                        <Typography variant="h6" gutterBottom>
                            [{TicketNumber}]{b.SelectionText} 
                        </Typography>
                        <Typography variant="h6" gutterBottom>
                            {b.BetAmount} TND
                        </Typography>
                    </Stack>

                    <Stack direction="row" justifyContent="end">
                        <Typography variant="h6" gutterBottom>
                                GAIN MAX {b.Multiplier} TND
                        </Typography>
                    </Stack>
                </Box>
                )
              }
              <Box sx={{ pr: 2 }}>
                <Stack direction="row" alignItems="center" justifyContent="space-between" mb={2} mt={3}>
                    <Typography variant="h6" >
                        Mise Totale 
                    </Typography>    
                    <Typography variant="h6">
                        {sumMises()} TND
                    </Typography>   
                </Stack>
              </Box>
              <Box sx={{ pr: 2 }}>
                <Stack direction="row" alignItems="center" justifyContent="space-between" mb={2} >
                    <Typography variant="h6" >
                        Prix maximum par ticket
                    </Typography>    
                    <Typography variant="h6">
                        {maxPrixTicket()} TND
                    </Typography>   
                </Stack>
              </Box>
              <Box sx={{ pr: 2 }}>
                <Stack direction="row" alignItems="center" justifyContent="space-between" mb={2} >
                    <Typography variant="h6" >
                        Max paiement par pari 
                    </Typography>    
                    <Typography variant="h6">
                    99999999,99 TND TND
                    </Typography>   
                </Stack>
              </Box>
              <Box sx={{ pr: 2 }}>
                <Stack direction="row" alignItems="center" justifyContent="space-between" mb={2} >
                    <Typography variant="h6" >
                        Paiement gagnant maximum
                    </Typography>    
                    <Typography variant="h6">
                        {maxPrixTicket()} TND
                    </Typography>   
                </Stack>
              </Box>
            </div>
          </Scrollbar>
        </Card>
      </Container>
    </Page>
  );
}
