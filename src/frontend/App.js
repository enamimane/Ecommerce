// App.js
import React from 'react';
import AppAdmin from 'Admin/AppAdmin';

const App = () => {
 /* const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const user = AuthService.getCurrentUser();
    setIsAdmin(user && user.roles.includes('ROLE_ADMIN'));
  }, []);
*/
  return (

  <AppAdmin />


  );
};

export default App;
