import * as Yup from 'yup';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
// @mui
import { Link, Stack, IconButton, InputAdornment,TextField } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// components
import Iconify from '../../../components/Iconify';
import {setUserSession,getUser} from '../../../utils/common';
import servIP from '../../../ServConf'; 



// ----------------------------------------------------------------------

export default function LoginForm() {



  const navigate = useNavigate();
  useEffect(() => {
    const myUser = getUser();
    if(myUser != null)
    navigate("/dashboard/app");  
  },[]);
  const [showPassword, setShowPassword] = useState(false);
  
  const [Identifiant,setIdentifiant] = useState("");
  const [Password,setPassword] = useState("");

  const handleSubmit = () => {
    fetch(`http://152.228.133.73:3251/signinAdmin`, {
      method:"post",
      headers: {
          'Content-Type': 'application/json'
      }, 
      body:JSON.stringify({
        Identifiant,
        Password
      })
  })
  .then((res) => {
    if(res.ok)
    {  
      res.json().then((data) => {
        setUserSession("any",data);
        navigate("/dashboard/app");
      });

    } else {
      console.log("Mauvais Identifiant / MDP");
    }
  }).catch((err) => {
    console.log(err)
  });
  } 

  return (
    <>
      <Stack spacing={3} mb={3}>
      <TextField
          label="Identifiant"
          fullWidth
          onChange={(e) => {setIdentifiant(e.target.value.toLowerCase())}}
          value={Identifiant.toLowerCase()}
        />
        <TextField
          label="Mot de passe"
          fullWidth
          onChange={(e) => {setPassword(e.target.value)}}
          type={showPassword ? 'text' : 'password'}
          value={Password}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                  <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Stack>


      <LoadingButton fullWidth size="large" type="submit" variant="contained" onClick={() => { handleSubmit() }}>
        Login
      </LoadingButton>
    </>
  );
}
