import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import DeleteForeverRoundedIcon from '@mui/icons-material/DeleteForeverRounded';
import IconButton from '@mui/material/IconButton';
 
import InputBase from "@mui/material/InputBase";

import SearchIcon from '@mui/icons-material/Search';

import { Box } from "@mui/material"
const columns = [
  { id: 'id', label: 'ID', minWidth: 50 },
  { id: 'nom', label: 'Nom', minWidth: 170 },
  { id: 'prenom', label: 'Prénom', minWidth: 170 },
  { id: 'email', label: 'E-mail', minWidth: 170 },
  { id: 'telephone', label: 'Téléphone', minWidth: 170 },
  // Ajoutez d'autres colonnes pour les attributs que vous souhaitez afficher
];

export default function ListUtilisateurs() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [users, setUsers] = useState([]);
  const [show, setShow] = useState(false);
  const [userId, setUserId] = useState(null);
  const [searchInput, setSearchInput] = React.useState('');
  useEffect(() => {
    // Effectuez une requête HTTP pour récupérer les utilisateurs depuis votre API
    axios.get('http://localhost:8080/api/user/Allusers')
      .then((response) => {
        setUsers(response.data); // Mettez les données des utilisateurs dans le state
      })
      .catch((error) => {
        console.error('Error fetching users:', error);
      });
  }, []); // Le deuxième argument [] signifie que ce code ne s'exécute qu'une seule fois après le rendu initial

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
const deleteUser = () => {
    // Écrivez la logique pour supprimer l'utilisateur via une requête HTTP DELETE à votre API
    axios.delete(`http://localhost:8080/api/User/delete/${userId}`)
      .then(() => {
        // Rafraîchissez la liste des utilisateurs après la suppression
        axios.get('http://localhost:8080/api/user/Allusers')
          .then((response) => {
            setUsers(response.data);
          })
          .catch((error) => {
            console.error('Error fetching users:', error);
          });
        setShow(false);
      })
      .catch((error) => {
        console.error('Error deleting user:', error);
      });
  };
  const handleShow = (id) => {
    setUserId(id);
    setShow(true);
  };
  const handleSearchChange = (event) => {
    setSearchInput(event.target.value);
  };
  const handleClose = () => {
    setShow(false);
  };
  return (
    <div>
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
        placeholder="Rechercher"
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



  <div style={{ marginTop: '20px' }}></div>
</div>

    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead  >
            <TableRow >
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align="left" // Alignement à gauche pour les données utilisateur
                 style={{backgroundColor:'#F1F6F9',minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
               <TableCell style={{backgroundColor:'#F1F6F9'}}>Actions </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {users
              .filter((user) =>
              user.nom.toLowerCase().includes(searchInput.toLowerCase()) ||   user.prenom.toLowerCase().includes(searchInput.toLowerCase()) 
              ||   user.adresse.toLowerCase().includes(searchInput.toLowerCase()) 
              ||   user.email.toLowerCase().includes(searchInput.toLowerCase()) 
              )
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((user) => (
                <TableRow hover role="checkbox" tabIndex={-1} key={user.id}>
                  {columns.map((column) => (
                    <TableCell key={column.id} align="left">
                      {user[column.id]}
                    </TableCell>
                  ))} 
                    <TableCell key="delete" align="left">
             
                 <IconButton color="error" onClick={() => handleShow(user.id)}>
      <DeleteForeverRoundedIcon style={{fontSize:'30px '}}/>
    </IconButton>
              </TableCell>

                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={users.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
       <Dialog open={show} onClose={handleClose}>
        <DialogTitle>Confirmation de suppression</DialogTitle>
        <DialogContent>
          Êtes-vous sûr de vouloir supprimer cet utilisateur ?
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} variant="contained">
            Fermer
          </Button>
          <Button onClick={deleteUser} variant="contained" color="error">
            Supprimer
          </Button>
        </DialogActions>
      </Dialog>
      </div>
  );
}
