import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CategoryCard from './CategoryCard';
import Grid from '@mui/material/Grid';
import { Link } from 'react-router-dom';

const Homme = ({ categoryName }) => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8080/api/categorie/AllCategorie')
      .then(response => {
      
        setCategories(response.data);
      })
      .catch(error => {
        console.error('Error fetching categories:', error);
      });
  }, []); // Cette dépendance vide signifie que cet effet s'exécutera une seule fois après le montage du composant

  // Filtrer les catégories en fonction de la catégorie principale sélectionnée
  const filteredCategories = categories.filter(cat => cat.parentCategorie && cat.parentCategorie.name === categoryName);

  return (
    <Grid container spacing={2}>
      {filteredCategories.map(cat => (
        <Grid key={cat.id} item xs={4}>
          <Link to={`/Admin/sous-categorie/${cat.id}`} style={{ textDecoration: 'none' }}>
            <CategoryCard category={cat} />
          </Link>
        </Grid>
      ))}
    </Grid>
  );
};

export default Homme;
