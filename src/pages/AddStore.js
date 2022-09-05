import { filter } from 'lodash';
import { sentenceCase } from 'change-case';
import { useState,useEffect } from 'react';
import { Link as RouterLink, useNavigate} from 'react-router-dom';
// material
import {
  Card,
  Table,
  Stack,
  Avatar,
  Button,
  TextField,
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


export default function AddStore() {
  const navigate = useNavigate();
  const [identifier,setIdentifier] = useState("");
  const [password,setPassword] = useState("");

  useEffect(() => {
    const myUser = getUser();
    if(myUser == null)
    navigate("/login");  
  },[]);

  const SendUserToServer = () => {
    fetch(`http://152.228.133.73:3251/addStore`, {
      method:"post",
      headers: {
          'Content-Type': 'application/json'
      }, 
      body:JSON.stringify({
        Identifiant:identifier.toLowerCase(),
        Password:password
      })
  })
  .then((res) => {
    if(res.ok)
    {  
      res.json().then((data) => {
        console.log("Store added");
        console.log(data);
        navigate("/dashboard/stores");
      });

    } else {
      console.log("Store already exists");
    }
  }).catch((err) => {
    console.log(err)
  });
  }

  return (
    <Page title="Ajouter Store">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
          Ajouter Store
          </Typography>
          <Button variant="contained" component={RouterLink} to="/dashboard/stores" startIcon={<Iconify icon="akar-icons:arrow-back-thick-fill" />}>
            Retour
          </Button>
        </Stack>

        <Card>

          <Scrollbar>
            <div style={{marginLeft:"2%", display:'flex',flexDirection:"column"}}>
              <Typography variant="h6" gutterBottom>
                Identifiant
              </Typography>
              <TextField id="outlined-basic" label="Identifiant" variant="outlined" style={{marginTop:20}}  onChange={(e) => {setIdentifier(e.target.value)}} value={identifier.toLowerCase()}/>
              <Typography variant="h6" gutterBottom  style={{marginTop:20}}> 
                Mot de passe
              </Typography>
              <TextField id="outlined-basic" label="Mot de passe" variant="outlined" type="password" onChange={(e) => {setPassword(e.target.value)}}/>
              <Button variant="contained" onClick={() => {SendUserToServer()}} startIcon={<Iconify icon="eva:plus-fill" />} style={{width:120,marginTop:20,marginBottom:10}}>
                Ajouter
              </Button>
            </div>
          </Scrollbar>
        </Card>
      </Container>
    </Page>
  );
}
