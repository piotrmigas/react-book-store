import { Pagination as Pageing } from '@mui/material';
import { ChangeEvent } from 'react';

type Props = {
  page: number;
  setPage: (value: number) => void;
  totalRecords: number;
  recordsPerPage: number;
};

export default function Pagination({ totalRecords, page, setPage, recordsPerPage }: Props) {
  const totalPages = Math.ceil(totalRecords / recordsPerPage);

  const handleChange = (_e: ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  return (
    <div style={{ marginTop: 25, display: 'flex', justifyContent: 'center' }}>
      <Pageing count={totalPages} page={page} onChange={handleChange} />
    </div>
  );
}
