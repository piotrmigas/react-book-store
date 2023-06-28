import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
  selectCart,
  selectTotal,
  selectTotalQuantity,
  addToCart,
  decreaseCart,
  getTotal,
  getTotalQuantity,
  clearCart,
} from '../redux/cartSlice';
import {
  Button,
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableCell,
  TableRow,
  TableBody,
  Typography,
} from '@mui/material';
import { Add, Remove, ArrowBackIosNew } from '@mui/icons-material';
import { useEffect } from 'react';

export default function Cart() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCart);
  const total = useSelector(selectTotal);
  const totalQuantity = useSelector(selectTotalQuantity);

  useEffect(() => {
    dispatch(getTotal());
    dispatch(getTotalQuantity());
  }, [cartItems, dispatch]);

  return (
    <>
      <div
        onClick={() => navigate('/')}
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          cursor: 'pointer',
          position: 'absolute',
          left: 10,
          top: 10,
        }}
      >
        <ArrowBackIosNew sx={{ fontSize: 15, mr: 1 }} />
        <Typography>Wstecz</Typography>
      </div>
      {cartItems.length > 0 ? <Typography sx={{ m: 3 }}>Koszyk</Typography> : null}
      {cartItems.length === 0 && <Typography sx={{ m: 3 }}>Twój koszyk jest pusty!</Typography>}
      {cartItems.length ? (
        <>
          <TableContainer component={Paper} elevation={5}>
            <Table sx={{ minWidth: 650 }}>
              <TableHead>
                <TableRow>
                  <TableCell align='center'>Okładka</TableCell>
                  <TableCell align='center'>Tytuł</TableCell>
                  <TableCell align='center'>Autor</TableCell>
                  <TableCell align='center'>Liczba stron</TableCell>
                  <TableCell align='center'>Cena</TableCell>
                  <TableCell align='center'>Ilość</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {cartItems.map((book: Book) => (
                  <TableRow key={book.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                    <TableCell component='th' scope='row'>
                      <img src={book.cover_url} alt='cover' width={100} height={100} />
                    </TableCell>
                    <TableCell align='center'>{book.title}</TableCell>
                    <TableCell align='center'>{book.author}</TableCell>
                    <TableCell align='center'>{book.pages}</TableCell>
                    <TableCell align='center'>
                      <div style={{ marginBottom: 5 }}>
                        {(book.price / 100).toFixed(2)} {book.currency}
                      </div>
                    </TableCell>
                    <TableCell align='center'>
                      <div style={{ display: 'flex', alignItems: 'center' }}>
                        <Add sx={{ fontSize: 14, cursor: 'pointer' }} onClick={() => dispatch(addToCart(book))} />
                        <div style={{ margin: '0 5px' }} data-testid='amount'>
                          {book.quantity}
                        </div>
                        <Remove
                          sx={{ fontSize: 14, cursor: 'pointer' }}
                          onClick={() => dispatch(decreaseCart(book.id))}
                        />
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
                <TableRow>
                  <TableCell align='right' colSpan={6}>
                    <span style={{ marginRight: 20 }}>Liczba książek: {totalQuantity}</span>
                    <span>Suma: {(total / 100).toFixed(2)} PLN</span>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
          <div style={{ margin: 25 }}>
            <Button variant='outlined' size='small' onClick={() => dispatch(clearCart())} sx={{ mr: 2 }}>
              Wyczyść koszyk
            </Button>
            <Button variant='contained' size='small' onClick={() => navigate('/checkout')}>
              Dalej
            </Button>
          </div>
        </>
      ) : null}
    </>
  );
}
