import CropOriginalIcon from '@mui/icons-material/CropOriginal';
import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import cattt from './addcat.png';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import {
  Button,
  FormHelperText,
  Grid,
  Stack,
  TextField,
} from '@mui/material';
import DoneIcon from '@mui/icons-material/Done';
import InputAdornment from '@mui/material/InputAdornment';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';

const validationSchema = Yup.object().shape({
  name: Yup.string().required('Le nom de la catégorie est requis'),
  image: Yup.string().required("L'URL de l'image est requis"),

});

const AddCategory = () => {
  const [categories, setCategories] = useState([{ sousCategorie: '', imageSousCategorie: '' }]);

  const onSubmit =async (values, { resetForm })=> {
    try {
      // Enregistrez la catégorie parente
      const responseParent = await axios.post('http://localhost:8080/api/categorie/add', {
        name: values.name,
        image: values.image,
      });
      if (responseParent.data) {
        // Enregistrez uniquement les sous-catégories avec un nom non nul
        const validSousCategories = values.categories.filter(category => category.sousCategorie !== null && category.sousCategorie !== '');

        const sousCategories = validSousCategories.map(category => ({
          name: category.sousCategorie,
          image: category.imageSousCategorie,
          parentCategorie: { id: responseParent.data },
        }));

        console.log("Sous-catégories à enregistrer : ", sousCategories);

        // Envoyez la requête POST avec les sous-catégories
        const response = await axios.post('http://localhost:8080/api/categorie/addSous', sousCategories);

        console.log('Catégories ajoutées avec succès', response.data);
      }

      resetForm();
    } catch (error) {
      console.error("Erreur lors de l'ajout des catégories", error.response?.data || error.message);
      // Gérer les erreurs ici
    }
  };

  
   
  const formik = useFormik({
    initialValues: {
      name: '',
      image: '',
      categories: categories,
    },
    validationSchema: validationSchema,
    onSubmit: onSubmit,
  });

  const addSousCategorie = () => {
    console.log('Clicked on addSousCategorie');

    // Ajouter un nouveau élément
    setCategories(prevCategories => [...prevCategories, { sousCategorie: '', imageSousCategorie: '' }]);
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
          <form onSubmit={formik.handleSubmit}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Stack spacing={1}>
                  <TextField
                    type="text"
                    label="Nom de la catégorie"
                    variant="outlined"
                    fullWidth
                    error={formik.touched.name && Boolean(formik.errors.name)}
                    helperText={formik.touched.name && formik.errors.name}
                    name="name"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    value={formik.values.name}
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
                    error={formik.touched.image && Boolean(formik.errors.image)}
                    helperText={formik.touched.image && formik.errors.image}
                    name="image"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    value={formik.values.image}
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
              {categories.map((category, index) => (
                <React.Fragment key={index}>
                  <Grid item xs={12}>
                    <Stack spacing={1}>
                      <TextField
                        type="text"
                        label={`Sous-catégorie ${index + 1}`}
                        variant="outlined"
                        fullWidth
                       
                        name={`categories.${index}.sousCategorie`}
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        value={formik.values.categories[index]?.sousCategorie}
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
                        label={`Image Sous-catégorie ${index + 1}`}
                        variant="outlined"
                        fullWidth
                       
                        name={`categories.${index}.imageSousCategorie`}
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        value={formik.values.categories[index]?.imageSousCategorie}
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
                </React.Fragment>
              ))}
              <Grid item xs={12}>
                <Stack spacing={1}>
                  <Fab size="small" color="primary" aria-label="add" onClick={addSousCategorie}>
                    <AddIcon />
                  </Fab>
                </Stack>
              </Grid>
              {formik.errors.submit && (
                <Grid item xs={12}>
                  <FormHelperText error>
                    {formik.errors.submit}
                  </FormHelperText>
                </Grid>
              )}
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
    </div>
  );
};

export default AddCategory;
