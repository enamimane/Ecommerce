import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import InputBase from "@mui/material/InputBase";
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import axios from 'axios';
import { Box } from "@mui/material"
import Label from 'components/label/Label';
export default function ListCommandes() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [commands, setCommands] = React.useState([]);
  const [searchInput, setSearchInput] = React.useState('');

  React.useEffect(() => {
    axios
      .get('http://localhost:8080/api/Order/AllOrders')
      .then((response) => {
        setCommands(response.data);
      })
      .catch((error) => {
        console.error('Erreur lors de la récupération des commandes', error);
      });
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleSearchChange = (event) => {
    setSearchInput(event.target.value);
  };

  
  return (
    <div >
      {/* Barre de recherche en dehors de Paper */}
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mt="30px"
        style={{
          backgroundColor: '#fff',
      
          padding: '8px',
          border: '1px solid #ccc',
       maxWidth: '300px' ,
       borderRadius:'6px'
        }}
      >
        <IconButton type="button" sx={{ p: 1 }}>
          <SearchIcon />
        </IconButton>
        <InputBase
          placeholder="Rechercher par ID de commande"
          value={searchInput}
          onChange={handleSearchChange}
          style={{
            marginLeft: '16px',
            flex: 1,
            border: 'none',
            outline: 'none',
          }}
        />
      </Box>

      {/* Tableau des commandes dans Paper */}
      <Paper sx={{ width: '100%', overflow: 'hidden', marginTop: '16px' }}>
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                <TableCell style={{ backgroundColor:'#F1F6F9'}}>ID</TableCell>
                <TableCell style={{ backgroundColor:'#F1F6F9'}}>Date de Commande</TableCell>
                <TableCell style={{ backgroundColor:'#F1F6F9'}}>Quantité</TableCell>
                <TableCell style={{ backgroundColor:'#F1F6F9'}}>Id Commande</TableCell>
                <TableCell style={{ backgroundColor:'#F1F6F9'}}>Utilisateur</TableCell>
                <TableCell style={{ backgroundColor:'#F1F6F9'}}>Panier ID</TableCell>
                <TableCell style={{ backgroundColor:'#F1F6F9'}}>Total</TableCell>
                <TableCell style={{ backgroundColor:'#F1F6F9'}}>Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {commands
                .filter((command) =>
                  command.commande.id.toString().includes(searchInput)
                )
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((command) => (
                  <TableRow hover role="checkbox" tabIndex={-1} key={command.id}>
                    <TableCell>{command.orderId}</TableCell>
                    <TableCell>{command.orderDate}</TableCell>
                    <TableCell>{command.orderQuantity}</TableCell>
                    <TableCell>{command.commande.id}</TableCell>
                    <TableCell>
                      {command.user
                        ? `${command.user.prenom} ${command.user.nom}`
                        : 'Utilisateur inconnu'}
                    </TableCell>
                    <TableCell>
                      {command.panier ? command.panier.id : 'Panier inconnu'}
                    </TableCell>
         
              
                    <TableCell>{command.orderPrice}</TableCell>
                    <TableCell>      
                    <Label color={command.commande.status === 'Délivré' ? 'success' : 
              command.commande.status === 'En_cours' ? 'error' : 
              command.commande.status === 'Expédiée' ? 'primary' : 
              'primary'}>
{command.commande.status}
</Label>

                    </TableCell>
                 
                
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={commands.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </div>
  );
}
