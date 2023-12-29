
import axios from 'axios';
import addtocart from '../assets/images/menu/add-to-cart.png';
import addcategory from '../assets/images/menu/to-do-list.png';
import settings from '../assets/images/menu/settings.png';

const image = {
  addtocart,
  addcategory,
  settings
};

const Pages = {};

// Fetch categories and update the Pages object
axios.get('http://localhost:8080/api/categorie/AllCategorie')
  .then(response => {
    const hommeCategories = response.data.filter(category => category.parentCategorie === null);
    const categoriesData = hommeCategories.map(category => ({
      id: category.name,
      title: category.name,
      type: 'item',
      url: `/Admin/${category.name}`,
      icon: category.image,
      
      target: false,
    }));

    Pages.id = 'produits';
    Pages.title = 'Catégories';
    Pages.type = 'group';
    Pages.children = [
      ...categoriesData,
   
      { 
        id: 'parametres',
        title: 'Paramètres',
        type: 'item',
        url: '/Admin/SettingsCategory',
        icon: image.settings,
        target: false,

      },
    ];
  })
  .catch(error => console.error(error));

export default Pages;
