import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import MuiBreadcrumbs from '@mui/material/Breadcrumbs';
import MainCard from '../MainCard';

const Breadcrumbs = ({ navigation, title, ...others }) => {
  const location = useLocation();
  const [main, setMain] = useState();
  const [item, setItem] = useState();

  const getCollapse = (menu) => {
    if (menu.children) {
      menu.children.forEach((collapse) => {
        if (collapse.type && collapse.type === 'collapse') {
          getCollapse(collapse);
        } else if (collapse.type && collapse.type === 'item' && location.pathname === collapse.url) {
          setMain(menu);
          setItem(collapse);
        }
      });
    }
  };

  useEffect(() => {
    navigation?.items?.forEach((menu) => {
      if (menu.type && menu.type === 'group') {
        getCollapse(menu);
      }
    });
  }, [location.pathname, navigation]);

  if (location.pathname === '/breadcrumbs') {
    location.pathname = '/dashboard/analytics';
  }

  let mainContent = null;
  let breadcrumbContent = null;

  if (main && main.type === 'collapse') {
    mainContent = (
      <Link to={document.location.pathname} style={{ textDecoration: 'none', color: 'inherit' }}>
        {main.title}
      </Link>
    );
  }

  if (item && item.type === 'item' && item.breadcrumbs !== false) {
    breadcrumbContent = (
      <MainCard border={false} sx={{ mb: 3, bgcolor: 'transparent' }} {...others} content={false}>
        <MuiBreadcrumbs aria-label="breadcrumb" style={{ fontSize: '14px' }}>
       
          {mainContent}
        </MuiBreadcrumbs>
        {title && (
          <span style={{ fontSize: '16px', marginTop: '8px' }}>
          </span>
        )}
      </MainCard>
    );
  }

  return breadcrumbContent;
};

Breadcrumbs.propTypes = {
  navigation: PropTypes.object,
  title: PropTypes.bool,
};

export default  Breadcrumbs;