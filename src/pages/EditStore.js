import { filter } from 'lodash';
import { sentenceCase } from 'change-case';
import { useEffect, useState } from 'react';
import { Link as RouterLink, useNavigate, useLocation} from 'react-router-dom';
// material
import {
  Card,
  Table,
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
import CurrencyTextField from '@unicef/material-ui-currency-textfield';
import { getUser } from '../utils/common';
import servIP from '../ServConf'; 
// components
import Page from '../components/Page';
import Scrollbar from '../components/Scrollbar';
import Iconify from '../components/Iconify';

export default function EditStore() {
  const location = useLocation();
  const {Balance, _id, Status,Identifiant} = location.state;
  console.log(Balance);
  console.log(Status);
  const [balance,setBalance] = useState(Balance);
  const [status,setStatus] = useState(Status);
  const navigate = useNavigate();

  useEffect(() => {
    const myUser = getUser();
    if(myUser == null)
    navigate("/login");  
  });

  const SendUpdateUserToServer = () => {
    fetch(`http://152.228.133.73:3251/editStore`, {
      method:"post",
      headers: {
          'Content-Type': 'application/json'
      }, 
      body:JSON.stringify({
       _id,
       Status:status,
       Balance:balance
      })
  })
  .then((res) => {
    if(res.ok)
    {  
      res.json().then((data) => {
        console.log("Store edited");
        console.log(data);
        navigate("/dashboard/stores");
      });

    } else {
      console.log("Store dosen't exist or error");
    }
  }).catch((err) => {
    console.log(err)
  });
  }

  return (
    <Page title="Edit Store">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Edit Store
          </Typography>
          <Button variant="contained" component={RouterLink} to="/dashboard/stores" startIcon={<Iconify icon="akar-icons:arrow-back-thick-fill" />}>
            Retour
          </Button>
        </Stack>

        <Card>

          <Scrollbar>
            <div style={{marginLeft:"2%", display:'flex',flexDirection:"column"}}>
              <Typography variant="h6" gutterBottom>
                {Identifiant}
              </Typography>
              <CurrencyTextField
              style={{width:"30vw"}}
                label="Solde"
                variant="standard"
                value={balance}
                currencySymbol="TND"
                // minimumValue="0"
                outputFormat="string"
                decimalCharacter="."
                digitGroupSeparator=","
                onChange={(event, value)=> setBalance(value)}
             />
              <InputLabel id="demo-simple-select-label" style={{marginTop:20}}>Status</InputLabel>
                <Select
                onChange={(e) => {setStatus(e.target.value)}}
                value={status}
                label="Status"
                style={{marginTop:20}}
                >
                <MenuItem value="active">Actif</MenuItem>
                <MenuItem value="banned">Banni</MenuItem>
                </Select>
              <Button variant="contained" onClick={() => {SendUpdateUserToServer()}} startIcon={<Iconify icon="dashicons:update"/>} style={{width:120,marginTop:20,marginBottom:10}}>
                Modifier
              </Button>
            </div>
          </Scrollbar>
        </Card>
      </Container>
    </Page>
  );
}
