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
import { Helmet } from 'react-helmet-async';
import { filter } from 'lodash';
import { sentenceCase } from 'change-case';
import { Stack, Container, Typography } from '@mui/material';
import Card from '@mui/material/Card';
import Iconify from '../components/iconify';
import Scrollbar from '../components/scrollbar';
import { UserListHead, UserListToolbar } from '../sections/@dashboard/user';
import USERLIST from '../_mock/user';

const TABLE_HEAD = [
  { id: 'id', label: 'ID', alignRight: false },
  { id: 'nom', label: 'Nom', alignRight: false },
  { id: 'description', label: 'Description', alignRight: false },
  { id: 'images', label: 'Images associées', alignRight: false },
  { id: 'actions', label: 'Actions', alignRight: false },
];

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function applySortFilter(array, comparator, query) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  if (query) {
    return filter(array, (_user) => _user.name.toLowerCase().indexOf(query.toLowerCase()) !== -1);
  }
  return stabilizedThis.map((el) => el[0]);
}

export default function Chaussures() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [products, setProducts] = useState([]);
  const [show, setShow] = useState(false);
  const [produitId, setProduitId] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:8080/api/produit/Allproduits')
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        console.error('Error fetching products:', error);
      });
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const deleteProduit = () => {
    axios.delete(`http://localhost:8080/api/produit/delete/${produitId}`)
      .then(() => {
        axios.get('http://localhost:8080/api/produit/Allproduits')
          .then((response) => {
            setProducts(response.data);
          })
          .catch((error) => {
            console.error('Error fetching products:', error);
          });
        setShow(false);
      })
      .catch((error) => {
        console.error('Error deleting product:', error);
      });
  };

  const handleShow = (id) => {
    setProduitId(id);
    setShow(true);
  };

  const handleClose = () => {
    setShow(false);
  };

  return (
    <div>
      <Paper sx={{ width: '100%', overflow: 'hidden' }}>
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {TABLE_HEAD.map((headCell) => (
                  <TableCell key={headCell.id} style={{ backgroundColor: 'lightblue' }}>
                    {headCell.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>

            <TableBody>
              {products.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((product) => (
                <TableRow hover role="checkbox" tabIndex={-1} key={product.id}>
                  <TableCell>{product.id}</TableCell>
                  <TableCell>{product.nom}</TableCell>
                  <TableCell>{product.description}</TableCell>
                  <TableCell>
                    {product.image && product.image.map((image) => (
                      <img
                        style={{ width: '50px', height: '60px' }}
                        key={product.id}
                        src={image.image}
                        alt={`Illustration du produit : ${product.nom}`}
                      />
                    ))}
                  </TableCell>
                  <TableCell key="delete" align="left">
                    <IconButton color="error" onClick={() => handleShow(product.id)}>
                      <DeleteForeverRoundedIcon style={{ fontSize: '30px ' }} />
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
          count={products.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
      <Dialog open={show} onClose={handleClose}>
        <DialogTitle>Confirmation de suppression</DialogTitle>
        <DialogContent>
          Êtes-vous sûr de vouloir supprimer ce produit ?
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} variant="contained">
            Fermer
          </Button>
          <Button onClick={deleteProduit} variant="contained" color="error">
            Supprimer
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
