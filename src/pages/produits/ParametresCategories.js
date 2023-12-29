
import { useNavigate } from 'react-router-dom';


  import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AddBoxIcon from '@mui/icons-material/AddBox';
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

import EditIcon from '@mui/icons-material/Edit';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import Box from '@mui/material/Box';
import { Link } from 'react-router-dom';
const columns = [
  { id: 'id', label: 'ID', minWidth: 50 },
  { id: 'image', label: 'Image', minWidth: 170 },
  { id: 'name', label: 'Nom de la catégorie', minWidth: 170 },
];

export default function ParametresCategories() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [categories, setCategories] = useState([]);
  const [show, setShow] = useState(false);
  const [categorieId, setCategorieId] = useState(null);
  const [searchInput, setSearchInput] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get('http://localhost:8080/api/categorie/AllCategorie')
      .then((response) => {
        setCategories(response.data);
      })
      .catch((error) => {
        console.error('Error fetching categories:', error);
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

  const editCategory = (categorieId) => {
    navigate(`/Admin/EditCategory/${categorieId}`);
  };

  const deleteCategorie = () => {
    axios
      .delete(`http://localhost:8080/api/categorie/delete/${categorieId}`)
      .then(() => {
        axios
          .get('http://localhost:8080/api/categorie/AllCategorie')
          .then((response) => {
            setCategories(response.data);
          })
          .catch((error) => {
            console.error('Error fetching categories:', error);
          });
        setShow(false);
      })
      .catch((error) => {
        console.error('Error deleting categorie:', error);
      });
  };

  const handleShow = (id) => {
    setCategorieId(id);
    setShow(true);
  };

  const handleClose = () => {
    setShow(false);
  };

  return (
    <div >
<div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
  {/* Barre de recherche en dehors de Paper */}
  <Box
    display="flex"
    alignItems="center"
    style={{
      backgroundColor: '#fff',
      padding: '8px',
      border: '1px solid #ccc',
      maxWidth: '300px',
      minWidth: '300px',
      borderRadius: '6px',
      marginRight: '10px', // Adjust the right margin as needed
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

 
    <Link
    to="/Admin/Choix"
    style={{
      textDecoration: 'none',
      color: 'black',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      marginTop: '10px',
      marginLeft: '20px', // Adjust the left margin as needed
    }}
  >
    <AddBoxIcon style={{ color: 'black', fontSize: '35px', cursor: 'pointer' }} />
    <p style={{ margin: 0, marginTop: '5px' }}>Ajouter</p>
  </Link>
</div>

    {/* Tableau des commandes dans Paper */}
    <Paper sx={{ width: '100%', overflow: 'hidden', marginTop: '16px' }}>
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align="left"
                    style={{ backgroundColor:'#F1F6F9', minWidth: column.minWidth }}
                  >
                    {column.label}
                  </TableCell>
                ))}
                <TableCell style={{ backgroundColor: '#F1F6F9'}}>Actions </TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
            {categories
  .filter((categorie) =>
    categorie && categorie.name &&
    (categorie.name.toLowerCase().includes(searchInput.toLowerCase()) ||
      (categorie.parentCategorie && categorie.parentCategorie.name &&
        categorie.parentCategorie.name.toLowerCase().includes(searchInput.toLowerCase()))
    )
  )

                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((categorie) => (
                  <TableRow hover role="checkbox" tabIndex={-1} key={categorie.id}>
                    <TableCell>{categorie.id}</TableCell>
                    <TableCell>
                      <img
                        style={{ width: '60px', height: '60px', borderRadius: '50%' }}
                        key={categorie.id}
                        src={categorie.image}
                        alt={`Illustration du categorie : ${categorie.name}`}
                      />
                    </TableCell>
                    <TableCell>
                      {categorie.parentCategorie
                        ? `${categorie.parentCategorie.name} : ${categorie.name}`
                        : categorie.name}
                    </TableCell>
                    <TableCell key="delete" align="left">
                      <IconButton onClick={() => editCategory(categorie.id)}>
                        <EditIcon style={{ fontSize: '25px', marginRight: '20px' }} />
                      </IconButton>
                      <IconButton color="error" onClick={() => handleShow(categorie.id)}>
                        <DeleteForeverRoundedIcon style={{ fontSize: '28px' }} />
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
          count={categories.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
      <Dialog open={show} onClose={handleClose}>
        <DialogTitle>Confirmation de suppression</DialogTitle>
        <DialogContent>Êtes-vous sûr de vouloir supprimer cette catégorie ?</DialogContent>
        <DialogActions>
          <Button onClick={handleClose} variant="contained">
            Fermer
          </Button>
          <Button onClick={deleteCategorie} variant="contained" color="error">
            Supprimer
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
