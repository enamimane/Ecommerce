import React from 'react';
import CategoryCard from './CategoryCard';
import Grid from '@mui/material/Grid';

import cuisine from '../../assets/images/menu/maison/cuisine.jpeg';
import decoration from '../../assets/images/menu/maison/decoration.jpeg';
import salledebain from '../../assets/images/menu/maison/salledebain.jpeg';


const MaisonCuisine = () => {
    const categories = [
      {
        id: 1,
        name: 'Décoration',
        image: decoration,
        backgroundColor: '#F5F5F5', // Couleur de fond pour la catégorie d'électronique
      },
      {
        id: 2,
        name: 'Cuisine & salle à manger',
        image: cuisine,
        backgroundColor: '#F5F5F5', // Couleur de fond pour la catégorie d'électronique
      },
      {
        id: 3,
        name: 'Salle de bain',
        image: salledebain,
        backgroundColor: '#F5F5F5',
       // Couleur de fond pour la catégorie d'électronique
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
      );};
  export default MaisonCuisine;