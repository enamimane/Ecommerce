import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const CategoryCard = ({ category, onClick }) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    if (onClick) {
      onClick();
    } else {
      navigate(`/Admin/sous-categorie/${category.id}`);
    }
  };

  const handleCardKeyPress = (event) => {
    if ((event.key === 'Enter' || event.key === ' ') && onClick) {
      onClick();
    }
  };

  const cardStyle = {
    display: 'flex',
   backgroundColor: '#F5F5F5',
    padding: '5px',
    marginBottom: '2px',
    borderRadius: '5px',
    width: '280px',
    height: '100px',
  };

  const imageStyle = {
    width: '80px',
    height: '80px',
    borderRadius: '50%',
    objectFit: 'cover',
    marginRight: '20px',
  };

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={(event) => {
        handleCardClick(event);
        event.preventDefault(); // Empêcher la navigation par défaut de <Link>
      }}
      onKeyPress={handleCardKeyPress}
      style={{ cursor: 'pointer' }}
    >
      <Card style={cardStyle}>
        <CardContent style={{ display: 'flex', alignItems: 'center' }}>
          <img src={category.image} alt={category.name} style={imageStyle} />
          <Typography variant="h6">{category.name}</Typography>
        </CardContent>
      </Card>
    </div>
  );
};

export default CategoryCard;
