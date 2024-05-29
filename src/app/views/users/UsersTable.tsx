import {
  Box,
  Icon,
  IconButton,
  styled,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow
} from '@mui/material';
import axios from 'axios';
import { useState } from 'react';
import { useEffect } from 'react';
import { useNavigate, useRoutes } from 'react-router-dom';

const StyledTable = styled(Table)(({ theme }) => ({
  whiteSpace: 'pre',
  '& thead': {
    '& tr': { '& th': { paddingLeft: 0, paddingRight: 0 } }
  },
  '& tbody': {
    '& tr': { '& td': { paddingLeft: 0, textTransform: 'capitalize' } }
  }
}));

const subscribarList = [
  {
    name: 'john doe',
    date: '18 january, 2019',
    amount: 1000,
    status: 'close',
    company: 'ABC Fintech LTD.'
  },
  {
    name: 'kessy bryan',
    date: '10 january, 2019',
    amount: 9000,
    status: 'open',
    company: 'My Fintech LTD.'
  },
  {
    name: 'james cassegne',
    date: '8 january, 2019',
    amount: 5000,
    status: 'close',
    company: 'Collboy Tech LTD.'
  },
  {
    name: 'lucy brown',
    date: '1 january, 2019',
    amount: 89000,
    status: 'open',
    company: 'ABC Fintech LTD.'
  },
  {
    name: 'lucy brown',
    date: '1 january, 2019',
    amount: 89000,
    status: 'open',
    company: 'ABC Fintech LTD.'
  },
  {
    name: 'lucy brown',
    date: '1 january, 2019',
    amount: 89000,
    status: 'open',
    company: 'ABC Fintech LTD.'
  }
];

const UsersTable = () => {
  const navigate = useNavigate();
  const [users, setusers] = useState([]);

  useEffect(() => {
    const callApi = async () => {
      const { data: users } = await axios.get('/users');
      console.log(users);
      setusers(users);
    };
    callApi();
  }, []);

  return (
    <Box width="100%" overflow="auto">
      <StyledTable>
        <TableHead>
          <TableRow>
            <TableCell align="left">#</TableCell>
            <TableCell align="center">username</TableCell>
            <TableCell align="center">First name</TableCell>
            <TableCell align="center">Last name</TableCell>
            <TableCell align="center">email</TableCell>
            <TableCell align="right">Action</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {users &&
            users.length > 0 &&
            users.map((user: any, index) => (
              <TableRow key={index}>
                <TableCell align="left">{user.id}</TableCell>
                <TableCell align="left">{user.username}</TableCell>
                <TableCell align="left">{user.firstName}</TableCell>
                <TableCell align="left">{user.lastName}</TableCell>
                <TableCell align="left">{user.email ?? '-'}</TableCell>
                <TableCell align="right">
                  <IconButton
                    onClick={() => {
                      navigate('/users/update/1');
                    }}
                  >
                    <Icon color="primary">Roles</Icon>
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </StyledTable>
    </Box>
  );
};

export default UsersTable;
