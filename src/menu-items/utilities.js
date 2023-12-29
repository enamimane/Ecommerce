import users from '../assets/images/menu/group.png';
import demandes from '../assets/images/menu/demandes.png';

// icons

const image={
users,
demandes
}

// ==============================|| MENU ITEMS - UTILITIES ||============================== //

const utilities = {
  id: 'utilisateurs&demandes',
  title: 'Utilisateurs & Demandes',
  type: 'group',
  children: [
    {
      id: 'utilisateurs',
      title: 'Utilisateurs',
      type: 'item',
      url: '/Admin/utilisateurs',
      icon: image.users
    },
    {
      id: 'demandes',
      title: 'Demandes',
      type: 'item',
      url: '/Admin/demandes',
      icon: image.demandes
    },

  ]
};

export default utilities;
