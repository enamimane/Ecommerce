import React from 'react';
import CategoryCard from './CategoryCard';
import Grid from '@mui/material/Grid';

import sac from '../../assets/images/menu/sport/sac.jpeg';
import fitness from '../../assets/images/menu/sport/fitness.jpeg';
import technologie from '../../assets/images/menu/sport/technologie.jpeg';


const Sport = () => {
    const categories = [
      {
        id: 1,
        name: 'Equipements de fitness',
        image: fitness,
        backgroundColor: '#F5F5F5', // Couleur de fond pour la catégorie d'électronique
      },
      {
        id: 2,
        name: 'Accessoires de sport',
        image: sac,
        backgroundColor: '#F5F5F5', // Couleur de fond pour la catégorie d'électronique
      },
      {
        id: 3,
        name: 'Technologie Sportive',
        image: technologie,
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
  export default Sport;