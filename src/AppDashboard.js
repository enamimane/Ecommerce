import Routes from 'routes';
import ThemeCustomization from 'themes';
import ScrollTop from 'components/ScrollTop';
import { Route } from 'react-router-dom';
import MainRoutes from 'routes/MainRoutes';
import { useEffect, useState } from 'react';
import axios from 'axios';

const AppDashboard = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    // Fetch categories data
    axios.get('http://localhost:8080/api/categorie/AllCategorie')
      .then(response => {
        setCategories(response.data);
      })
      .catch(error => console.error(error));
  }, []);

  return (
    <ThemeCustomization>
      <ScrollTop>
        <Routes>
          <Route path="/Admin" element={<MainRoutes categories={categories} />} />
        </Routes>
      </ScrollTop>
    </ThemeCustomization>
  );
};

export default AppDashboard;
