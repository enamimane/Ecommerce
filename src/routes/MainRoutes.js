
import axios from 'axios';
import { lazy } from 'react';
import Loadable from 'components/Loadable';
import MainLayout from 'layout/MainLayout';

const Profil = Loadable(lazy(() => import('pages/produits/Profil')));
const EditerProfil = Loadable(lazy(() => import('pages/produits/EditerProfil')));

const ChoisSousOrCat = Loadable(lazy(() => import('pages/produits/ChoisSousOrCat')));
const SamplePage = Loadable(lazy(() => import('pages/extra-pages/SamplePage')));

const EditProduct = Loadable(lazy(() => import('pages/produits/EditProduct')));

const DashboardDefault = Loadable(lazy(() => import('pages/dashboard')));

const AddSousCategory = Loadable(lazy(() => import('pages/produits/AddSousCategory')));
const EditCategory = Loadable(lazy(() => import('pages/produits/EditCategory')));
const Beaute = Loadable(lazy(() => import('pages/produits/Beaute')));
const Electronique = Loadable(lazy(() => import('pages/produits/Electronique')));
const Homme = Loadable(lazy(() => import('pages/produits/Homme')));
const MaisonCuisine = Loadable(lazy(() => import('pages/produits/MaisonCuisine')));
const Sport = Loadable(lazy(() => import('pages/produits/Sport')));
const ListUtilisateurs = Loadable(lazy(() => import('pages/users&demande/ListUtilisateurs')));
const ListDemandes = Loadable(lazy(() => import('pages/users&demande/ListDemandes')));
const AjoutProduit = Loadable(lazy(() => import('pages/produits/AjoutProduit')));
const SubCategoryPage = Loadable(lazy(() => import('pages/produits/SubCategoryPage')));
const ParametresCategories = Loadable(lazy(() => import('pages/produits/ParametresCategories')));
const AddCategory = Loadable(lazy(() =>import ('pages/produits/AddCategory')));

const Typography = Loadable(lazy(() => import('pages/components-overview/Typography')));
const Color = Loadable(lazy(() => import('pages/components-overview/Color')));
const Shadow = Loadable(lazy(() => import('pages/components-overview/Shadow')));
const AntIcons = Loadable(lazy(() => import('pages/components-overview/AntIcons')));

const MainRoutes = {};

// Fetch categories and update the MainRoutes object
axios.get('http://localhost:8080/api/categorie/AllCategorie')
  .then(response => {
    const hommeCategories = response.data.filter(category => category.parentCategorie === null);
    const categoriesData = hommeCategories.map(category => ({
      path: `/Admin/${category.name}`,
      element: <Homme categoryName={category.name} />,
    }));

    MainRoutes.path = '/Admin';
    MainRoutes.element = <MainLayout />;
    MainRoutes.children = [
    
      {
        path: '/Admin/beaute',
        element: <Beaute />
      },
      {
        path: '/Admin/SettingsCategory',
        element: <ParametresCategories />
      },  
      {
        path: '/Admin/EditCategory/:id',
        element: <EditCategory />
      },  
      {
        path: '/Admin/AddSousCategory',
        element: <AddSousCategory />
      }, 
   
      {
        path: '/Admin/EditProduct/:id',
        element: <EditProduct />
      }, 
      {
        path: '/Admin/AjoutProduit',
        element: <AjoutProduit />
      },
      {
        path: '/Admin/Profil',
        element: <Profil />
      },
      {
        path: '/Admin/éléctronique',
        element: <Electronique />
      },
      {
        path: '/Admin/sous-categorie/:categoryId',
        element: <SubCategoryPage />
      },

      {
        path: '/Admin/Choix',
        element: <ChoisSousOrCat />
      },
      {
        path: '/Admin/maison&cuisine',
        element: <MaisonCuisine />
      },

      {
        path: '/Admin/EditerProfil',
        element: <EditerProfil/>
      },
      {
        path: '/Admin/sport',
        element: <Sport />
      },
      ...categoriesData,
      {
        path: '/Admin',
        element: <DashboardDefault />
      },
      {
        path: '/Admin/AddCategoriy',
        element: <AddCategory />
      }, 
      {
        path: '/Admin/utilisateurs',
        element: <ListUtilisateurs />
      },
      {
        path: '/Admin/demandes',
        element: <ListDemandes />
      },
      {
        path: '/Admin/color',
        element: <Color />
      },
      {
        path: '/Admin/dashboard',
        children: [
          {
            path: 'default',
            element: <DashboardDefault />
          }
        ]
      },
      {
        path: 'sample-page',
        element: <SamplePage />
      },
      {
        path: 'shadow',
        element: <Shadow />
      },
      {
        path: 'typography',
        element: <Typography />
      },
      {
        path: 'icons/ant',
        element: <AntIcons />
      }
    ];
  })
  .catch(error => console.error(error));

export default MainRoutes;
