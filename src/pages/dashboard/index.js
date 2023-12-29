import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Typography, Grid } from '@mui/material';
import { useSpring, animated, config } from 'react-spring';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import PersonIcon from '@mui/icons-material/Person';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import CategoryIcon from '@mui/icons-material/Category';
import PaymentIcon from '@mui/icons-material/Payment';
import Inventory2Icon from '@mui/icons-material/Inventory2';

const StatisticCard = ({ icon, count, label, color }) => {
  const props = useSpring({
    number: count,
    from: { number: 0 },
    config: config.default,
  });

  return (
    <Card
      sx={{
        backgroundColor: color,
        color: '#fff',
        borderRadius: '16px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '220px', // Ajustez la hauteur comme nécessaire
        width: '170px', // Ajustez la largeur comme nécessaire
        margin: '8px', // Ajustez l'espace entre les cartes
        fontSize: '16px', // Ajustez la taille de la police pour l'écriture
      }}
    >
      {icon}
      <CardContent>
        <Typography variant="h6">
          <animated.span style={{ display: 'block', textAlign: 'center', fontSize: '35px' }}>
            {props.number.interpolate((val) => Math.floor(val))}
          </animated.span>
        </Typography>
        <Typography variant="body-md" textAlign="center">
          {label}
        </Typography>
      </CardContent>
    </Card>
  );
};

const UserCard = () => {
  const [userCount, setUserCount] = useState(0);
  const [productCount, setProductCount] = useState(0);
  const [categoryCount, setCategoryCount] = useState(0);
  const [orderCount, setOrderCount] = useState(0);
  const [subcategoryCount, setSubcategoryCount] = useState(0);

  useEffect(() => {
    axios.get('http://localhost:8080/api/user/Allusers')
      .then(response => {
        const totalUsers = response.data.length;
        setUserCount(totalUsers);
      })
      .catch(error => {
        console.error('Erreur lors de la récupération des utilisateurs', error);
      });

    axios.get('http://localhost:8080/api/produit/Allproduits')
      .then(response => {
        const totalProducts = response.data.length;
        setProductCount(totalProducts);
      })
      .catch(error => {
        console.error('Erreur lors de la récupération des produits', error);
      });

    axios.get('http://localhost:8080/api/categorie/AllCategorie')
      .then(response => {
        const mainCategories = response.data.filter(cat => cat.parentCategorie === null);
        setCategoryCount(mainCategories.length);

        const subcategories = response.data.filter(cat => cat.parentCategorie !== null);
        setSubcategoryCount(subcategories.length);
      })
      .catch(error => {
        console.error('Erreur lors de la récupération des catégories', error);
      });

    axios.get('http://localhost:8080/api/commande/Allcommandes')
      .then(response => {
        const totalOrders = response.data.length;
        setOrderCount(totalOrders);
      })
      .catch(error => {
        console.error('Erreur lors de la récupération des commandes', error);
      });
  }, []);

 

  return (
    <Grid container spacing={0.5} justifyContent="center">
      <Grid item>
        <StatisticCard
          icon={<PersonIcon fontSize="large" />}
          count={userCount}
          label="Utilisateurs"
          color="#7FB7D2"
        />
      </Grid>
      <Grid item>
        <StatisticCard
          icon={<ShoppingCartIcon fontSize="large" />}
          count={productCount}
          label="Produits"
          color="#F78E99"
        />
      </Grid>
      <Grid item>
        <StatisticCard
          icon={<Inventory2Icon fontSize="large" />}
          count={categoryCount}
          label="Catégories"
          color="#DAA7E8"
        />
      </Grid>
      <Grid item>
        <StatisticCard
          icon={<CategoryIcon fontSize="large" />}
          count={subcategoryCount}
          label="Sous-catégories"
          color="#B895A4"
        />
      </Grid>
      <Grid item>
        <StatisticCard
          icon={<PaymentIcon fontSize="large" />}
          count={orderCount}
          label="Commandes"
          color="#B3AACF"
        />
      </Grid>

    </Grid>
  );
};

export default UserCard;
