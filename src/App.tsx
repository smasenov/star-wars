import { Page, SearchInput, CheckboxInput } from './components';
import { Stack, Typography } from '@mui/material';
import { useArray } from './shared/hooks';

type ListItem = {
  id: string;
  name: string;
  checked: boolean;
}

const App = () => {

  const checkList = useArray<ListItem>([
    { id: '1', name: 'all', checked: true },
    { id: '2', name: 'people', checked: false },
    { id: '3', name: 'planets', checked: false },
    { id: '4', name: 'starships', checked: false },
    { id: '5', name: 'vehicles', checked: false }
  ]);

  const handleChange = (id: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
    const updatedCheckList = checkList.array.map(item => ({
      ...item,
      checked: item.id === id ? event.target.checked : false
    }));
    checkList.set(updatedCheckList);
  };

  const selectedQuery = checkList.array.find(list => list.checked)

  return (
    <Page title='Home' sx={{ display: 'flex', justifyContent: 'center', minHeight: '100vh' }}>
      <Stack direction='column' sx={{ alignItems: 'center' }} gap={2}>
        <Typography variant='h2'>{'Star Wars'}</Typography>
        <SearchInput queryName={selectedQuery?.name && selectedQuery?.name ? selectedQuery.name : ''} />
        <CheckboxInput onChange={handleChange} checkList={checkList.array} />
      </Stack>
    </Page >
  );
}

export default App;
