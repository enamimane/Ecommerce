import React from 'react';
import CategoryCard from './CategoryCard';
import Grid from '@mui/material/Grid';

import levre from '../../assets/images/menu/beaute/levre.jpeg';
import yeux from '../../assets/images/menu/beaute/yeux.jpeg';

import pinceaux from '../../assets/images/menu/beaute/pinceaux.jpeg';

import visage from '../../assets/images/menu/beaute/visage.jpeg';
import soin from '../../assets/images/menu/beaute/soin.jpeg';
import organisation from '../../assets/images/menu/beaute/organisation.jpeg';
const Beaute = () => {
    const categories = [
      {
        id: 1,
        name: 'Maquillage visage',
        image: visage,
        backgroundColor: '#F5F5F5', // Couleur de fond pour la catégorie d'électronique
      },
      {
        id: 2,
        name: 'Maquillage yeux',
        image: yeux,
        backgroundColor: '#F5F5F5', // Couleur de fond pour la catégorie d'électronique
      },
      {
        id: 3,
        name: 'Lèvre',
        image: levre,
        backgroundColor: '#F5F5F5',
       // Couleur de fond pour la catégorie d'électronique
      },
      {
        id: 4,
        name: 'Soins',
        image: soin,
        backgroundColor: '#F5F5F5', // Couleur de fond pour la catégorie d'électronique
      },
      {
        id: 5,
        name: 'Pinceaux à maquillage',
        image: pinceaux,
        backgroundColor: '#F5F5F5',

     // Couleur de fond pour la catégorie d'électronique
      },
      {
        id: 6,    
        name: 'Organisations de maquillage',
        image: organisation,
        backgroundColor: '#F5F5F5',  // Couleur de fond pour la catégorie d'électronique
      },
      // Ajoutez d'autres catégories
    ];
  
    return (
        <Grid container spacing={2}>
          {categories.map((category) => (
            <Grid key={category.id} item xs={4}>
              <CategoryCard category={category} />
            </Grid>
          ))}
        </Grid>
      );
    };
  export default Beaute;