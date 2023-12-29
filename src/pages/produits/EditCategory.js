import React, { useState, useEffect } from 'react';
import axios from 'axios';
import cattt from './cattt.png';
import { useParams } from 'react-router-dom';
import { Button, Grid, Stack, TextField } from '@mui/material';
import DoneIcon from '@mui/icons-material/Done';
import InputAdornment from '@mui/material/InputAdornment';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import CropOriginalIcon from '@mui/icons-material/CropOriginal';

const EditCategory = () => {
  const { id } = useParams();
  const [editedCategory, setEditedCategory] = useState({ name: '', image: '' });

  useEffect(() => {
    axios.get(`http://localhost:8080/api/categorie/${id}`)
      .then(res => {
        setEditedCategory(res.data);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  const handleUpdate = () => {
    console.log('Mise à jour avec :', editedCategory);
    axios.put(`http://localhost:8080/api/categorie/update/${id}`, editedCategory)
      .then(res => {
        console.log('Catégorie mise à jour avec succès', res);
      })
      .catch(error => {
        console.error('Erreur lors de la mise à jour de la catégorie', error);
      });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedCategory(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <div style={{ padding: '20px', maxWidth: '800px', border: '1.5px solid #6DB9EF', boxShadow: '0 3px 6px rgba(0, 0, 0, 0.2)', borderRadius: '10px' }}>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <img
            src={cattt}
            alt="imageCate"
            style={{ display: 'block', margin: '0 auto', width: '80px', height: '90px', marginBottom: '15px' }}
          />
        </div>
        <div style={{ flex: '1', maxWidth: '500px' }}>
          <form>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Stack spacing={1}>
                  <TextField
                    type="text"
                    label="Nom de la catégorie"
                    variant="outlined"
                    fullWidth
                    name="name"
                    value={editedCategory.name}
                    onChange={handleChange}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <LocalOfferIcon />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Stack>
              </Grid>
              <Grid item xs={12}>
                <Stack spacing={1}>
                  <TextField
                    type="text"
                    label="Image"
                    variant="outlined"
                    fullWidth
                    name="image"
                    value={editedCategory.image}
                    onChange={handleChange}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <CropOriginalIcon />
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
                    type="submit"
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

export default EditCategory;
