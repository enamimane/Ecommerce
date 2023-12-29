
import { CommonProvider } from 'frontend/contexts/common/commonContext';

import { FiltersProvider } from 'frontend/contexts/filters/filtersContext';
import { CartProvider } from 'frontend/contexts/cart/cartContext';
import { FavoritesProvider } from 'frontend/favoris/favoritesContext';
import Header from 'frontend/components/common/Header';
import Footer from 'frontend/components/common/Footer';
import BackTop from 'frontend/components/common/BackTop';
import RouterRoutes from 'frontend/routes/RouterRoutes';
import AuthService from 'frontend/components/form/ServicesConnexionInscription/auth.service';
import AppDashboard from 'AppDashboard';


import { useEffect, useState } from 'react';
const App= () => {
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const user = AuthService.getCurrentUser();
    setIsAdmin(user && user.roles.includes('ROLE_ADMIN'));
  }, []);
  return (
    <>
    {!isAdmin &&  <CommonProvider>
        <FiltersProvider>
          <CartProvider>
          <FavoritesProvider>
            <Header />
            <RouterRoutes />
            <Footer />
            <BackTop />
            </FavoritesProvider>
          </CartProvider>
        </FiltersProvider>
      </CommonProvider>}
    {isAdmin && <AppDashboard/>}
    </>
  );
};
export default App;