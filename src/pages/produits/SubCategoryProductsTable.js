import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import DeleteForeverRoundedIcon from '@mui/icons-material/DeleteForeverRounded';
import IconButton from '@mui/material/IconButton';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import EditIcon from '@mui/icons-material/Edit';
import { useNavigate } from 'react-router-dom';
import InputBase from "@mui/material/InputBase";
import { sentenceCase } from 'change-case';
import SearchIcon from '@mui/icons-material/Search';
import Label from 'components/label/Label';
import { Box } from "@mui/material";
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { Link } from 'react-router-dom';
const SubCategoryProductsTable = ({ categoryId }) => {
  const [page, setPage] = useState(0);
  const [searchInput, setSearchInput] = React.useState('');
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [allProducts, setAllProducts] = useState([]);
  const [subCategoryProducts, setSubCategoryProducts] = useState([]);
  const [show, setShow] = useState(false);
  const [productId, setProduitId] = useState(null);

  useEffect(() => {
    // Load all products
    axios.get('http://localhost:8080/api/produit/Allproduits')
      .then(response => {
        setAllProducts(response.data);
      })
      .catch(error => console.error(error));
  }, []); 

 
  const deleteProduct = () => {
    // Écrivez la logique pour supprimer l'utilisateur via une requête HTTP DELETE à votre API
    axios.delete(`http://localhost:8080/api/produit/delete/${productId}`)
      .then(() => {
        // Rafraîchissez la liste des utilisateurs après la suppression
        axios.get('http://localhost:8080/api/produit/Allproduits')
          .then((response) => {
            setAllProducts(response.data);
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
  useEffect(() => {
    // Filter products belonging to the specified sub-category
    const productsInSubCategory = allProducts.filter(product => product.categorie && product.categorie.id == categoryId);
    setSubCategoryProducts(productsInSubCategory);
  }, [allProducts, categoryId]);
  

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  const handleShow = (id) => {
    setProduitId(id);
    setShow(true);
  };
  const handleSearchChange = (event) => {
    setSearchInput(event.target.value);
  };
  const handleClose = () => {
    setShow(false);
  };
  const navigate = useNavigate();
  const editProduit = (id) => {
    navigate(`/Admin/EditProduct/${id}`);
  }
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
    to="/Admin/AjoutProduit"
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
    <AddShoppingCartIcon style={{ color: 'black', fontSize: '35px', cursor: 'pointer' }} />
    <p style={{ margin: 0, marginTop: '5px' }}>Ajouter</p>
  </Link>



</div>
    {/* Tableau des commandes dans Paper */}
    <Paper sx={{ width: '100%', overflow: 'hidden', marginTop: '16px' }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow >
              <TableCell style={{backgroundColor:'#F1F6F9'}} align="center">ID</TableCell>
              <TableCell style={{backgroundColor:'#F1F6F9'}}>Image</TableCell>
              <TableCell style={{backgroundColor:'#F1F6F9'}}>Nom</TableCell>
              <TableCell style={{backgroundColor:'#F1F6F9'}}>Description</TableCell>
              <TableCell style={{backgroundColor:'#F1F6F9'}}align="center">Stock</TableCell>
              <TableCell style={{backgroundColor:'#F1F6F9'}}align="center">Prix</TableCell>
              <TableCell style={{backgroundColor:'#F1F6F9'}}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {subCategoryProducts.
                filter((product) =>
                product.nom.toLowerCase().includes(searchInput.toLowerCase())
                ).slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
         
              .map(product => (
                <TableRow key={product.id}>
                  <TableCell>{product.id}</TableCell>
                  <TableCell>
                      <img
                        style={{ width: '60px', height: '70px' }}
                        key={product.id}
                        src={product.imageproduit}
                        alt={`Illustration du produit : ${product.nom}`}
                      />
                  
                  </TableCell>
                  <TableCell>{product.nom}</TableCell>
                  <TableCell>{product.description}</TableCell>
                  <TableCell>
                  <Label color={'primary'}>{sentenceCase(status)}
                  {product.stock}</Label>
                  </TableCell>
                  <TableCell>
                  <Label style={{color:'#6B240C',backgroundColor:'#F4DFC8'}}>
                  {product.prix} MAD</Label></TableCell>
                
                  <TableCell>
                  <IconButton  onClick={() => editProduit(product.id)}>
                        <EditIcon style={{ fontSize: '25px' ,marginRight:'5px' }} />
                      </IconButton>
                  <IconButton color="error" onClick={() => handleShow(product.id)}>
      <DeleteForeverRoundedIcon style={{fontSize:'25px '}}/>
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
        count={subCategoryProducts.length}
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
            <Button onClick={deleteProduct} variant="contained" color="error">
              Supprimer
            </Button>
          </DialogActions>
        </Dialog>
        </div>
  );
};

export default SubCategoryProductsTable;
