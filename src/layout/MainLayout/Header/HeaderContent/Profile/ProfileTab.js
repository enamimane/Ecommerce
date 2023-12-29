import PropTypes from 'prop-types';
import { useState } from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';
import { List, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import { Link ,useNavigate} from 'react-router-dom';
// assets
import { EditOutlined, LogoutOutlined, UserOutlined } from '@ant-design/icons';
import AuthService from 'frontend/components/form/ServicesConnexionInscription/auth.service';
// ==============================|| HEADER PROFILE - PROFILE TAB ||============================== //

const ProfileTab = ({ handleLogout }) => {
  const theme = useTheme();

  const [selectedIndex, setSelectedIndex] = useState(0);
  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);

  };
  const navigate = useNavigate();
  const logOut = async () => {
    await AuthService.logout();
  
    navigate('/'); // Redirect to the root URL using navigate
    window.location.reload(); // Reload the page
  };

  return (
    <List component="nav" sx={{ p: 0, '& .MuiListItemIcon-root': { minWidth: 32, color: theme.palette.grey[500] } }}>
              <Link to="/Admin/Profil"
          style={{
            textDecoration: 'none',
            color: 'black',
            display: 'flex'}}>
            <ListItemButton selected={selectedIndex === 1} onClick={(event) => handleListItemClick(event, 1)}>
        <ListItemIcon>
          <UserOutlined />
        </ListItemIcon>
        <ListItemText primary="Profil"/>
      </ListItemButton>
      </Link>
      <Link to="/Admin/EditerProfil"
          style={{
            textDecoration: 'none',
            color: 'black',
            display: 'flex'}}>
      <ListItemButton selected={selectedIndex === 0} onClick={(event) => handleListItemClick(event, 0)}>
    
         <ListItemIcon>
          <EditOutlined />
        </ListItemIcon>
   
        <ListItemText primary="Editer profil" />
 
      </ListItemButton>
      </Link>
     
      <ListItemButton selected={selectedIndex === 2} onClick={handleLogout}>
        <ListItemIcon>
          <LogoutOutlined />
        </ListItemIcon>
        <ListItemText primary="Se déconnecter" onClick={logOut}/>
      </ListItemButton>
    </List>
  );
};

ProfileTab.propTypes = {
  handleLogout: PropTypes.func
};

export default ProfileTab;
