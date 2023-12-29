import { CommonProvider } from './contexts/common/commonContext';
import { CartProvider } from './contexts/cart/cartContext';
import Header from './components/common/Header';
import RouterRoutes from './routes/RouterRoutes';
import Footer from './components/common/Footer';
import BackTop from './components/common/BackTop';
import { FiltersProvider } from './contexts/filters/filtersContext';
import { FavoritesProvider } from './favoris/favoritesContext';

const Appp = () => {
  return (
    <>
      <CommonProvider>
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
      </CommonProvider>
    </>
  );
};
export default Appp;