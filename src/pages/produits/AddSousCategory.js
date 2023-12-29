import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import CropOriginalIcon from '@mui/icons-material/CropOriginal';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import Button from '@mui/material/Button';
import FormHelperText from '@mui/material/FormHelperText';
import Grid from '@mui/material/Grid';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import DoneIcon from '@mui/icons-material/Done';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import cattt from './addcat.png'
const validationSchema = Yup.object().shape({
  idd: Yup.string().required("ID est requis"),
  categories: Yup.array().of(
    Yup.object().shape({
      sousCategorie: Yup.string().required('Le nom de la sous-catégorie est requis'),
      imageSousCategorie: Yup.string().required("L'URL de l'image est requis"),
    })
  ),
});

const AddSousCategory = () => {
  const [categories, setCategories] = useState([{ idd: '', sousCategorie: '', imageSousCategorie: '' }]);

  const onSubmit = async (values, { resetForm }) => {
    try {
      const sousCategories = values.categories.map(category => ({
        name: category.sousCategorie,
        image: category.imageSousCategorie,
        parentCategorie: { id: values.idd }
      }));

      console.log("Sous-catégories à enregistrer : ", sousCategories);

      const response = await axios.post('http://localhost:8080/api/categorie/addSous', sousCategories);

      console.log('Catégories ajoutées avec succès', response.data);

      resetForm();
    } catch (error) {
      console.error("Erreur lors de l'ajout des catégories", error.response?.data || error.message);
    }
  };

  const formik = useFormik({
    initialValues: {
      idd: '',
      categories: categories,
    },
    validationSchema: validationSchema,
    onSubmit: onSubmit,
  });

  const addSousCategorie = () => {
    setCategories(prevCategories => [...prevCategories, { idd: '', sousCategorie: '', imageSousCategorie: '' }]);
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
                <TextField
                  type="number"
                  label="ID"
                  variant="outlined"
                  fullWidth
                  error={formik.touched.idd && Boolean(formik.errors.idd)}
                  helperText={formik.touched.idd && formik.errors.idd}
                  name="idd"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.idd}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <LocalOfferIcon />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>

              {formik.values.categories.map((category, index) => (
                <React.Fragment key={index}>
                  <Grid item xs={12}>
                    <TextField
                      type="text"
                      label={`Sous-catégorie ${index + 1}`}
                      variant="outlined"
                      fullWidth
                      error={formik.touched.categories?.[index]?.sousCategorie && Boolean(formik.errors.categories?.[index]?.sousCategorie)}
                      helperText={formik.touched.categories?.[index]?.sousCategorie && formik.errors.categories?.[index]?.sousCategorie}
                      name={`categories.${index}.sousCategorie`}
                      onBlur={formik.handleBlur}
                      onChange={formik.handleChange}
                      value={formik.values.categories?.[index]?.sousCategorie}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <LocalOfferIcon />
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      type="text"
                      label={`Image Sous-catégorie ${index + 1}`}
                      variant="outlined"
                      fullWidth
                      error={formik.touched.categories?.[index]?.imageSousCategorie && Boolean(formik.errors.categories?.[index]?.imageSousCategorie)}
                      helperText={formik.touched.categories?.[index]?.imageSousCategorie && formik.errors.categories?.[index]?.imageSousCategorie}
                      name={`categories.${index}.imageSousCategorie`}
                      onBlur={formik.handleBlur}
                      onChange={formik.handleChange}
                      value={formik.values.categories?.[index]?.imageSousCategorie}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <CropOriginalIcon />
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Grid>
                </React.Fragment>
              ))}
              <Grid item xs={12}>
                <Fab size="small" color="primary" aria-label="add" onClick={addSousCategorie}>
                  <AddIcon />
                </Fab>
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

export default AddSousCategory;
