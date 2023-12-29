import React, { useState, useEffect } from 'react';
import axios from 'axios';
import cattt from './edit.png';
import { useParams } from 'react-router-dom';
import { Button, Grid, Stack, TextField } from '@mui/material';
import DoneIcon from '@mui/icons-material/Done';
import InputAdornment from '@mui/material/InputAdornment';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import CropOriginalIcon from '@mui/icons-material/CropOriginal';
import DescriptionIcon from '@mui/icons-material/Description';
import NumbersIcon from '@mui/icons-material/Numbers';

const EditProduct = () => {
    const { id } = useParams();
  const [editedProduct, setEditedProduct] = useState({ nom: '', imageproduit: '', description: '', prix: 0, stock: 0 });


  useEffect(() => {
    axios.get(`http://localhost:8080/api/produit/${id}`)
      .then(res => {
        setEditedProduct(res.data);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  const handleUpdate = () => {
    axios.put(`http://localhost:8080/api/produit/update/${id}`, editedProduct)
      .then(res => {
        console.log('Produit mis à jour avec succès', res);


      })
      .catch(error => {
        console.error('Erreur lors de la mise à jour du produit', error);
      });
  };
  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedProduct(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <div style={{ padding: '20px', maxWidth: '800px', boxShadow: '0 3px 14px rgba(0, 0, 0, 0.2)', borderRadius: '10px' }}>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <img
            src={cattt}
            alt="imageCate"
            style={{ display: 'block', margin: '0 auto', width: '60px', height: '70px', marginBottom: '15px' }}
          />
        </div>
        <div style={{ flex: '1', maxWidth: '500px' }}>
          <form>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Stack spacing={1}>
                  <TextField
                    type="text"
                    label="Nom du produit"
                    variant="outlined"
                    fullWidth
                    name="nom"
                    value={editedProduct.nom}
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
                    label="Image du produit"
                    variant="outlined"
                    fullWidth
                    name="imageproduit"
                    value={editedProduct.imageproduit}
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
                <Stack spacing={1}>
                  <TextField
                    type="text"
                    label="Description du produit"
                    variant="outlined"
                    fullWidth
                    name="description"
                    value={editedProduct.description}
                    onChange={handleChange}
                    InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <DescriptionIcon />
                          </InputAdornment>
                        ),
                      }}
                    
                  />
                </Stack>
              </Grid>
              <Grid item xs={12}>
                <Stack spacing={1}>
                  <TextField
                    type="number"
                    label="Prix du produit"
                    variant="outlined"
                    fullWidth
                    name="prix"
                    value={editedProduct.prix}
                    onChange={handleChange}
                           InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <NumbersIcon />
                          </InputAdornment>
                        ),
                      }}
                  />
                </Stack>
              </Grid>
              <Grid item xs={12}>
                <Stack spacing={1}>
                  <TextField
                    type="number"
                    label="Stock du produit"
                    variant="outlined"
                    fullWidth
                    name="stock"
                    value={editedProduct.stock}
                    onChange={handleChange}
                    InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <NumbersIcon />
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

export default EditProduct;
