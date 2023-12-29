// SubCategoryPage.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import SubCategoryProductsTable from './SubCategoryProductsTable';
import { useParams } from 'react-router-dom'; // Ajoutez cette ligne


const SubCategoryPage = () => {
  const { categoryId } = useParams();
  const [subCategoryName, setSubCategoryName] = useState('');

  useEffect(() => {
    // Utilisez l'ID de la catégorie pour obtenir des informations supplémentaires si nécessaire
    axios.get(`http://localhost:8080/api/categorie/${categoryId}`)
      .then(response => {
        setSubCategoryName(response.data.name);
      })
      .catch(error => console.error(error));
  }, [categoryId]);

  return (
    <div>
    <h3 style={{ textAlign: "center" }}>Produits de la sous-catégorie {subCategoryName}</h3>
 
    <SubCategoryProductsTable categoryId={categoryId} />
   
  </div>
  );
};

export default SubCategoryPage;
