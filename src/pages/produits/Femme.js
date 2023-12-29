import React, { useState, useEffect } from 'react';

import CategoryCard from './CategoryCard';
import Grid from '@mui/material/Grid';
import axios from 'axios';
import { Link } from 'react-router-dom';
const Femme = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    // Charger les catégories homme
    axios.get('http://localhost:8080/api/categorie/AllCategorie')
      .then(response => {
        // Filtrer les catégories qui ont parentCategorie égal à femme
        const hommeCategories = response.data.filter(category => category.parentCategorie && category.parentCategorie.name === 'Femme');
        setCategories(hommeCategories);
      })
      .catch(error => console.error(error));
  }, []); // Assurez-vous de déclencher cela au moment approprié

  return (
    <Grid container spacing={2}>
      {categories.map((categoryId) => (
        <Grid key={categoryId.id} item xs={4}>
          <Link to={`/sous-categorie/${categoryId.id}`} style={{ textDecoration: 'none' }}>
            <CategoryCard category={categoryId} />
          </Link>
        </Grid>
      ))}
    </Grid>
  );
};

export default Femme;



