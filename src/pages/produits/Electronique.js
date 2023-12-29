import React from 'react';
import CategoryCard from './CategoryCard';
import Grid from '@mui/material/Grid';





import telephone from '../../assets/images/menu/electronique/telephone.jpeg';

import pc from '../../assets/images/menu/electronique/pc.jpeg';

import television from '../../assets/images/menu/electronique/television.jpeg';
const Electronique = () => {
    const categories = [
      {
        id: 1,
        name: 'Télévisions',
        image: television,
        backgroundColor: '#F5F5F5', // Couleur de fond pour la catégorie d'électronique
      },
      {
        id: 2,
        name: 'Téléphones & Tablettes',
        image: telephone,
        backgroundColor: '#F5F5F5', // Couleur de fond pour la catégorie d'électronique
      },
      {
        id: 3,
        name: 'Pc',
        image: pc,
        backgroundColor: '#F5F5F5',
       // Couleur de fond pour la catégorie d'électronique
      }
     
    ];
  
    return (
        <Grid container spacing={2}>
          {categories.map((category) => (
            <Grid key={category.id} item xs={4}>
              <CategoryCard category={category} />
            </Grid>
          ))}
        </Grid>
      );};
  export default Electronique;