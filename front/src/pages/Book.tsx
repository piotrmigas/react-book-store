import { useNavigate, useParams } from 'react-router-dom';
import { useGetBookQuery } from '../redux/api';
import { Watch } from 'react-loader-spinner';
import { Card, Typography, CardMedia, CardContent } from '@mui/material';
import { ArrowBackIosNew } from '@mui/icons-material';

export default function Book() {
  const { bookId } = useParams();
  const navigate = useNavigate();
  const { data, isLoading } = useGetBookQuery(Number(bookId));

  const book = data?.data;

  if (isLoading) return <Watch width={25} />;

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
      <Card sx={{ maxWidth: 500 }} raised>
        <CardMedia
          sx={{ height: 300, objectFit: 'contain', padding: '24px 0', background: 'lightBlue' }}
          image={book?.cover_url}
          component='img'
        />
        <CardContent sx={{ paddingLeft: 4, paddingRight: 4 }}>
          <Typography variant='h6' component='div'>
            {book?.title}
          </Typography>
          <Typography variant='body2' color='text.secondary'>
            {book?.author}
          </Typography>
          <div style={{ marginTop: 10 }}>
            <Typography variant='body2'>Strony: {book?.pages}</Typography>
            <Typography variant='body2'>
              Cena: {book && (book.price / 100).toFixed(2)} {book?.currency}
            </Typography>
          </div>
        </CardContent>
      </Card>
    </>
  );
}
