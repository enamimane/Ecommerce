// Importations des bibliothèques
import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import CropOriginalIcon from '@mui/icons-material/CropOriginal';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import DescriptionIcon from '@mui/icons-material/Description';
import NumbersIcon from '@mui/icons-material/Numbers';
import {
  Button,
  FormHelperText,
  Grid,
  Stack,
  TextField,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from '@mui/material';
import DoneIcon from '@mui/icons-material/Done';
import InputAdornment from '@mui/material/InputAdornment';
import add from './add.png'
// Schéma de validation Yup
const validationSchema = Yup.object().shape({
  nom: Yup.string().required('Le nom du produit est requis'),
  imageproduit: Yup.string().required("L'URL de l'image du produit est requis"),
  description: Yup.string().required('La description du produit est requise'),
  prix: Yup.number().required('Le prix du produit est requis'),
  stock: Yup.number().required('Le stock du produit est requis'),
  categorie: Yup.object().shape({
    id: Yup.number().required('La catégorie est requise'),
    name: Yup.string().required('La catégorie est requise'),
  }),
  sousCategorie: Yup.object().shape({
    id: Yup.number().required('La sous-catégorie est requise'),
    name: Yup.string().required('La sous-catégorie est requise'),
  }),
});

// Composant principal du formulaire d'ajout de produit
const AddProduct = () => {
  // État local pour stocker les catégories
  const [categories, setCategories] = useState([]);
  // État local pour stocker les sous-catégories
  const [sousCategories, setSousCategories] = useState([]);
  // État local pour stocker les sous-catégories filtrées
  const [filteredSousCategories, setFilteredSousCategories] = useState([]);

  // Effet secondaire pour charger les catégories depuis l'API
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/categorie/AllCategorie');
        setCategories(response.data.filter(categorie => categorie.parentCategorie === null));
      } catch (error) {
        console.error("Erreur lors du chargement des catégories", error.response?.data || error.message);
      }
    };

    fetchCategories();
  }, []);

  // Effet secondaire pour charger les sous-catégories depuis l'API
  useEffect(() => {
    const fetchSousCategories = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/categorie/AllCategorie');
        setSousCategories(response.data);
      } catch (error) {
        console.error("Erreur lors du chargement des sous-catégories", error.response?.data || error.message);
      }
    };

    fetchSousCategories();
  }, []);

  // Utilisation de useFormik pour gérer le formulaire
  const formik = useFormik({
    initialValues: {
      nom: '',
      imageproduit: '',
      description: '',
      prix: 0,
      stock: 0,
      categorie: null,
      sousCategorie: null,
    },
    validationSchema: validationSchema,
    onSubmit: async (values, { resetForm }) => {
      try {
        // Requête POST pour ajouter le produit
        const response = await axios.post('http://localhost:8080/api/produit/add', values);

        console.log('Produit ajouté avec succès', response.data);

        // Réinitialiser le formulaire après la soumission réussie
        resetForm();
      } catch (error) {
        console.error("Erreur lors de l'ajout du produit", error.response?.data || error.message);
        // Gérer les erreurs ici
      }
    },
  });

  // Effet secondaire pour filtrer les sous-catégories en fonction de la catégorie sélectionnée
  useEffect(() => {
    if (formik.values.categorie) {
      const filtered = sousCategories.filter(sousCategorie => sousCategorie.parentCategorie !== null && sousCategorie.parentCategorie.id === formik.values.categorie.id);
      setFilteredSousCategories(filtered);
    } else {
      // Reset filteredSousCategories if no category is selected
      setFilteredSousCategories([]);
    }
  }, [formik.values.categorie, sousCategories]);

  // Rendu du formulaire
  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <div style={{ padding: '20px', maxWidth: '800px', boxShadow: '0 3px 14px rgba(0, 0, 0, 0.2)', borderRadius: '10px' }}>
      <img
            src={add}
            alt="add"
            style={{ display: 'block', margin: '0 auto', width: '80px', height: '90px', marginBottom: '15px' }}
          />
      
        <form onSubmit={formik.handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Stack spacing={1}>
                <TextField
                  type="text"
                  label="Nom du produit"
                  variant="outlined"
                  fullWidth
                  error={formik.touched.nom && Boolean(formik.errors.nom)}
                  helperText={formik.touched.nom && formik.errors.nom}
                  name="nom"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.nom}
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
                  error={formik.touched.imageproduit && Boolean(formik.errors.imageproduit)}
                  helperText={formik.touched.imageproduit && formik.errors.imageproduit}
                  name="imageproduit"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.imageproduit}
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
                  error={formik.touched.description && Boolean(formik.errors.description)}
                  helperText={formik.touched.description && formik.errors.description}
                  name="description"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.description}
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
                  error={formik.touched.prix && Boolean(formik.errors.prix)}
                  helperText={formik.touched.prix && formik.errors.prix}
                  name="prix"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.prix}
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
                  error={formik.touched.stock && Boolean(formik.errors.stock)}
                  helperText={formik.touched.stock && formik.errors.stock}
                  name="stock"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.stock}
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
                <FormControl fullWidth>
                  <InputLabel id="categorie-label">Catégorie</InputLabel>
                  <Select
                    labelId="categorie-label"
                    id="categorie"
                    name="categorie"
                    value={formik.values.categorie}
                    onChange={(e) => formik.setFieldValue('categorie', e.target.value)}
                    error={formik.touched.categorie && Boolean(formik.errors.categorie)}
                  >
                    {categories.map((categorie) => (
                      <MenuItem key={categorie.id} value={categorie}>
                        {categorie.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Stack>
            </Grid>
            <Grid item xs={12}>
              <Stack spacing={1}>
                <FormControl fullWidth>
                  <InputLabel id="sousCategorie-label">Sous-catégorie</InputLabel>
                  <Select
                    labelId="sousCategorie-label"
                    id="sousCategorie"
                    name="sousCategorie"
                    value={formik.values.sousCategorie}
                    onChange={(e) => formik.setFieldValue('sousCategorie', e.target.value)}
                    error={formik.touched.sousCategorie && Boolean(formik.errors.sousCategorie)}
                  >
                    {filteredSousCategories.map((sousCategorie) => (
                      <MenuItem key={sousCategorie.id} value={sousCategorie}>
                        {sousCategorie.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Stack>
            </Grid>
            <Grid item xs={12}>
              <FormHelperText error>
                {formik.errors.submit}
              </FormHelperText>
            </Grid>
            <Grid item xs={12}>
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <Button
                  disableElevation
                  disabled={formik.isSubmitting}
                  type="submit"
                  variant="contained"
                  color="primary"
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
  );
};

export default AddProduct;
