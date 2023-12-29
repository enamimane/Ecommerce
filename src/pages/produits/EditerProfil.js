import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Button,
  Grid,
  Stack,
  TextField,
} from '@mui/material';
import DoneIcon from '@mui/icons-material/Done';
import InputAdornment from '@mui/material/InputAdornment';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import LocationCityIcon from '@mui/icons-material/LocationCity';
import LocationSearchingIcon from '@mui/icons-material/LocationSearching';
import PublicIcon from '@mui/icons-material/Public';

const EditerProfil = () => {
  const currentUser = JSON.parse(localStorage.getItem('user'));
  const axiosInstance = axios.create({
    baseURL: 'http://localhost:8080/api',
  });

  const [, setUserProfile] = useState({
    nom: '',
    prenom: '',
    telephone: '',
    email: '',
    adresse: '',
    ville: '',
    pays: '',
    codePostale: '',
  });

  const [editedUserProfile, setEditedUserProfile] = useState({
    nom: '',
    prenom: '',
    telephone: '',
    email: '',
    adresse: '',
    ville: '',
    pays: '',
    codePostale: '',
  });

  useEffect(() => {
    axiosInstance.get(`/user/${currentUser.id}`)
      .then(res => {
        setUserProfile(res.data);
        setEditedUserProfile(res.data);
      })
      .catch(error => {
        console.error('Error fetching user profile:', error);
      });
  }, []);
  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedUserProfile(prevProfile => ({
      ...prevProfile,
      [name]: value,
    }));
  };
  

  const handleUpdate = () => {
    axiosInstance.put(`/user/update/${currentUser.id}`, editedUserProfile)
      .then(() => {
        console.log('User profile updated successfully');
        setUserProfile(editedUserProfile);
      })
      .catch(error => {
        console.error('Error updating user profile:', error);
      });
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <div style={{ padding: '20px', maxWidth: '800px', boxShadow: '0 3px 14px rgba(0, 0, 0, 0.2)', borderRadius: '10px' }}>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          {/* Add your image or avatar here */}
        </div>
        <div style={{ flex: '1', maxWidth: '500px' }}>
          <form>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Stack spacing={2}>
                <TextField
  type="text"
  label="Nom"
  variant="outlined"
  fullWidth
  name="nom"
  value={editedUserProfile.nom || ''}
  onChange={handleChange}
  InputProps={{
    startAdornment: (
      <InputAdornment position="start">
        <AccountBoxIcon />
      </InputAdornment>
    ),
  }}
/>

                  <TextField
                    type="text"
                    label="Prénom"
                    variant="outlined"
                    fullWidth
                    name="prenom"
                    value={editedUserProfile.prenom || ''}
                    onChange={handleChange}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <AccountBoxIcon />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Stack>
              </Grid>
              <Grid item xs={12}>
                <Stack spacing={2}>
                  <TextField
                    type="tel"
                    label="Téléphone"
                    variant="outlined"
                    fullWidth
                    name="telephone"
                    value={editedUserProfile.telephone || ''}
                    onChange={handleChange}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <PhoneIcon />
                        </InputAdornment>
                      ),
                    }}
                  />
                  <TextField
                    type="email"
                    label="Email"
                    variant="outlined"
                    fullWidth
                    name="email"
                    value={editedUserProfile.email || ''}
                    onChange={handleChange}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <EmailIcon />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Stack>
              </Grid>
              <Grid item xs={12}>
                <Stack spacing={2}>
                  <TextField
                    type="text"
                    label="Adresse"
                    variant="outlined"
                    fullWidth
                    name="adresse"
                    value={editedUserProfile.adresse || ''}
                    onChange={handleChange}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <LocationOnIcon />
                        </InputAdornment>
                      ),
                    }}
                  />
                  <TextField
                    type="text"
                    label="Code Postal"
                    variant="outlined"
                    fullWidth
                    name="codePostale"
                    value={editedUserProfile.codePostale || ''}
                    onChange={handleChange}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <LocationSearchingIcon />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Stack>
              </Grid>
              <Grid item xs={12}>
                <Stack spacing={2}>
                  <TextField
                    type="text"
                    label="Ville"
                    variant="outlined"
                    fullWidth
                    name="ville"
                    value={editedUserProfile.ville || ''}
                    onChange={handleChange}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <LocationCityIcon />
                        </InputAdornment>
                      ),
                    }}
                  />
                  <TextField
                    type="text"
                    label="Pays"
                    variant="outlined"
                    fullWidth
                    name="pays"
                    value={editedUserProfile.pays || ''}
                    onChange={handleChange}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <PublicIcon />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Stack>
              </Grid>
              <Grid item xs={12}>
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                  <Button
                    disableElevation
                    type="button"
                    variant="contained"
                    color="primary"
                    onClick={handleUpdate}
                    endIcon={<DoneIcon />}
                  >
                    Enregistrer
                  </Button>
                </div>
              </Grid>
            </Grid>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditerProfil;
