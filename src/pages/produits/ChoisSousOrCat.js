import React from 'react';
import { Link } from 'react-router-dom';
import addcat from './addcat.png';
import { Box } from '@mui/material';

const linkStyle = {
  textDecoration: 'none',
  color: 'black',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  marginTop:"70px"
};

const ChoisSousOrCat = () => {
  return (
    <Box alignItems="center" justifyContent="center" height="70vh">
      <Link to="/Admin/AddSousCategory" style={linkStyle}>
        <img src={addcat} alt="Add Category" style={{ width: '60px', height: '60px', marginBottom: '5px' }} />
        <p style={{ margin: '0', fontSize: '16px' }}>Ajouter une sous catégorie</p>
      </Link>

      <Box my={3} /> {/* Add space between links using margin (adjust the value as needed) */}

      <Link to="/Admin/AddCategoriy" style={linkStyle}>
        <img src={addcat} alt="Add Category" style={{ width: '100px', height: '100px', marginBottom: '5px' }} />
        <p style={{ margin: '0', fontSize: '16px' }}>Ajouter une catégorie</p>
      </Link>
    </Box>
  );
};

export default ChoisSousOrCat;
