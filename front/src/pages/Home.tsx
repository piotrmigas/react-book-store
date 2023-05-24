import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, selectCart, selectTotalQuantity, getTotalQuantity } from '../redux/cartSlice';
import { useGetBooksQuery } from '../redux/api';
import SearchBar from '../components/SearchBar';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Badge } from '@mui/material';
import Pagination from '../components/Pagination';
import useDebounce from '../hooks/useDebounce';
import { skipToken } from '@reduxjs/toolkit/query/react';
import { useSearchBookQuery } from '../redux/api';
import { ShoppingBasket } from '@mui/icons-material';
import { Watch } from 'react-loader-spinner';

export default function Home() {
  const [page, setPage] = useState(1);
  const { data: books, isLoading: isLoadingBooks } = useGetBooksQuery(page);
  const totalQuantity = useSelector(selectTotalQuantity);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState('');
  const [searchBy, setSearchBy] = useState('title');
  const cartItems = useSelector(selectCart);

  useEffect(() => {
    dispatch(getTotalQuantity());
  }, [cartItems, dispatch]);

  const query = useDebounce(searchTerm, 500);
  const { data: searchResults, isLoading: isLoadingSearch } = useSearchBookQuery(
    { page, query, searchBy } || skipToken
  );

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 20 }}>
        <SearchBar
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          searchBy={searchBy}
          setSearchBy={setSearchBy}
        />
        <Badge badgeContent={totalQuantity} color='error'>
          <ShoppingBasket onClick={() => navigate('/cart')} sx={{ cursor: 'pointer' }} />
        </Badge>
      </div>
      {(isLoadingBooks || isLoadingSearch) && (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <Watch width={25} />
        </div>
      )}
      <TableContainer component={Paper} elevation={5}>
        <Table sx={{ minWidth: 650 }}>
          <TableHead>
            <TableRow>
              <TableCell align='center'>Okładka</TableCell>
              <TableCell align='center'>Tytuł</TableCell>
              <TableCell align='center'>Autor</TableCell>
              <TableCell align='center'>Strony</TableCell>
              <TableCell align='center'>Cena</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {(query ? searchResults : books)?.data.map((book: Book) => (
              <TableRow
                key={book.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 }, cursor: 'pointer' }}
                onClick={() => navigate(`/book/${book.id}`)}
              >
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
                  <Button
                    variant='contained'
                    size='small'
                    onClick={(e) => {
                      e.stopPropagation();
                      dispatch(addToCart(book));
                    }}
                  >
                    Dodaj do koszyka
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {(!isLoadingSearch || !isLoadingBooks) && (
        <Pagination
          totalRecords={(query ? searchResults : books)?.metadata.total_records as number}
          setPage={setPage}
          page={page}
          recordsPerPage={(query ? searchResults : books)?.metadata.records_per_page as number}
        />
      )}
    </>
  );
}
