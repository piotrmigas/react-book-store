import { Input, Select, MenuItem, SelectChangeEvent } from '@mui/material';

type Props = {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  searchBy: string;
  setSearchBy: (value: string) => void;
};

export default function SearchBar({ setSearchTerm, searchTerm, searchBy, setSearchBy }: Props) {
  return (
    <div style={{ display: 'flex' }}>
      <Input
        type='text'
        placeholder='Search'
        style={{ margin: 10 }}
        onChange={(e) => setSearchTerm(e.target.value)}
        value={searchTerm}
      />
      <Select value={searchBy} onChange={(e: SelectChangeEvent) => setSearchBy(e.target.value)} size='small'>
        <MenuItem value='title'>by title</MenuItem>
        <MenuItem value='author'>by author</MenuItem>
      </Select>
    </div>
  );
}
