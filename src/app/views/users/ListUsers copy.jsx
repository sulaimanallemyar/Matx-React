import { Box, styled } from '@mui/material';
import { SimpleCard, Breadcrumb } from 'app/components';
import PaginationTable from '../material-kit/tables/PaginationTable';
import UsersTable from './UsersTable';

const Container = styled('div')(({ theme }) => ({
  margin: '30px',
  [theme.breakpoints.down('sm')]: { margin: '16px' },
  '& .breadcrumb': {
    marginBottom: '30px',
    [theme.breakpoints.down('sm')]: { marginBottom: '16px' }
  }
}));

const UsersList = () => {
  return (
    <Container>
      <Box className="breadcrumb">
        <Breadcrumb routeSegments={[{ name: 'Users List' }]} />
      </Box>

      <SimpleCard title="Users Table">
        <UsersTable />
      </SimpleCard>

      {/*
      <SimpleCard title="Pagination Table">
        <PaginationTable />
      </SimpleCard>
    */}
    </Container>
  );
};

export default UsersList;
