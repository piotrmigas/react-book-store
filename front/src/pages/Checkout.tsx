import { Button, TextField, Typography } from '@mui/material';
import { SubmitHandler, useForm, FieldValues, Controller } from 'react-hook-form';
import { useCreateOrderMutation } from '../redux/api';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { selectCart } from '../redux/cartSlice';
import { ArrowBackIosNew } from '@mui/icons-material';
import { useEffect } from 'react';

export default function Checkout() {
  const { control, handleSubmit } = useForm({ reValidateMode: 'onChange' });

  const navigate = useNavigate();
  const [createOrder, result] = useCreateOrderMutation();
  const cartItems = useSelector(selectCart);

  const onSubmit: SubmitHandler<FieldValues> = async ({ first_name, last_name, city, zip_code }) => {
    await createOrder({
      order: cartItems.map(({ id, quantity }) => ({ id, quantity })),
      first_name,
      last_name,
      city,
      zip_code: zip_code.toString(),
    });
  };

  useEffect(() => {
    if (result.data) alert(JSON.stringify(result.data, null, 2));
  }, [result]);

  return (
    <>
      <div
        onClick={() => navigate('/cart')}
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
      <Typography sx={{ m: 2 }}>Podsumowanie</Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <Controller
            rules={{ required: true }}
            control={control}
            name='first_name'
            defaultValue=''
            render={({ field, fieldState: { error } }) => (
              <TextField
                {...field}
                variant='outlined'
                label='Imię'
                size='small'
                sx={{ margin: 1 }}
                error={error !== undefined}
                helperText={error ? 'Imię jest wymagane' : ''}
              />
            )}
          />
        </div>
        <div>
          <Controller
            rules={{ required: true }}
            control={control}
            name='last_name'
            defaultValue=''
            render={({ field, fieldState: { error } }) => (
              <TextField
                {...field}
                variant='outlined'
                label='Nazwisko'
                size='small'
                sx={{ margin: 1 }}
                error={error !== undefined}
                helperText={error ? 'Nazwisko jest wymagane' : ''}
              />
            )}
          />
        </div>
        <div>
          <Controller
            rules={{ required: true }}
            control={control}
            name='city'
            defaultValue=''
            render={({ field, fieldState: { error } }) => (
              <TextField
                {...field}
                variant='outlined'
                label='Miejscowość'
                size='small'
                sx={{ margin: 1 }}
                error={error !== undefined}
                helperText={error ? 'Miejscowość jest wymagana' : ''}
              />
            )}
          />
        </div>
        <div>
          <Controller
            control={control}
            name='zip_code'
            defaultValue=''
            rules={{
              required: true,
              pattern: /\d{2}-\d{3}/,
            }}
            render={({ field, fieldState: { error } }) => (
              <TextField
                {...field}
                variant='outlined'
                size='small'
                label='Kod pocztowy'
                sx={{ margin: 1 }}
                error={error !== undefined}
                helperText={
                  error?.type === 'required'
                    ? 'Kod pocztowy jest wymagany'
                    : error?.type === 'pattern'
                    ? 'Błędny kod pocztowy'
                    : ''
                }
              />
            )}
          />
        </div>
        <div>
          <Button type='submit' variant='contained' size='small' sx={{ mt: 2 }}>
            Zamawiam i płacę
          </Button>
        </div>
      </form>
    </>
  );
}
