import { SimpleCard, ConfirmationDialog } from '../../components';
import {
  Icon,
  Button,
  Box,
  IconButton,
  styled,
  Dialog,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow
} from '@mui/material';
import { useEffect, useState } from 'react';
import { useUser } from '../../contexts/JWTAuthContext';
import { SUCCESS_DELETE_MESSAGE } from '../../utils/constant';
import { toast } from 'react-toastify';
import axios from 'axios';
import UpdateRole from './update-roles';

const StyledTable = styled(Table)(({ theme }) => ({
  whiteSpace: 'pre',
  '& thead': {
    '& tr': { '& th': { paddingLeft: 0, paddingRight: 0 } }
  },
  '& tbody': {
    '& tr': { '& td': { paddingLeft: 0, textTransform: 'capitalize' } }
  }
}));

const Container = styled('div')(({ theme }) => ({
  margin: '30px',
  [theme.breakpoints.down('sm')]: { margin: '16px' },
  '& .breadcrumb': {
    marginBottom: '30px',
    [theme.breakpoints.down('sm')]: { marginBottom: '16px' }
  }
}));

const StyledButton = styled(Button)(({ theme }) => ({
  margin: theme.spacing(1)
}));

const ListRoles = () => {
  const [id, setId] = useState<any>(0);
  const [passRole, setPassRole] = useState(null);

  const [currentEntity, setCurrentEntity] = useState(null);
  const { getEntities, updateSuccess } = useUser();
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [updateDialog, setUpdateDialog] = useState(false);
  const [allRules, setallRules] = useState<Array<any>>([]);
  const [deletedRules, setDeletedRules] = useState<Array<any>>([]);

  useEffect(() => {
    getEntities('');
    const init = async () => {
      const { data: allRules } = await axios.get('/roles');
      setallRules(allRules);
    };
    init();
  }, []);

  const reloadRoles = async () => {
    const { data: allRules } = await axios.get('/roles');
    setallRules(allRules);
  };

  useEffect(() => {
    if (updateSuccess) {
      if (confirmOpen) {
        setConfirmOpen(false);
        toast.success(SUCCESS_DELETE_MESSAGE);
      }

      getEntities('');
      setUpdateDialog(false);
    }
  }, [updateSuccess]);

  const onCreate = () => {
    setId(null);
    setCurrentEntity(null);
    setUpdateDialog(true);
  };

  return (
    <Container>
      <Box width="100%" overflow="auto">
        <StyledButton variant="contained" color="primary" onClick={() => onCreate()}>
          <Icon>add</Icon>Create
        </StyledButton>
        <SimpleCard title="Roles">
          <StyledTable>
            <TableHead>
              <TableRow>
                <TableCell align="left">Name</TableCell>
                <TableCell align="left">Description</TableCell>
                <TableCell align="center">Action</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {allRules &&
                allRules.map((subscriber, index) => (
                  <TableRow
                    key={index}
                    style={{ display: deletedRules.includes(subscriber.id) ? 'none' : 'tr' }}
                  >
                    <TableCell align="left">{subscriber.name}</TableCell>
                    <TableCell align="left">{subscriber.description}</TableCell>
                    <TableCell align="center">
                      <IconButton
                        onClick={() => {
                          setId(subscriber.id);
                          setPassRole(subscriber);
                          setUpdateDialog(true);
                        }}
                      >
                        <Icon color="primary">edit</Icon>
                      </IconButton>
                      <IconButton
                        onClick={() => {
                          setId(subscriber.id);
                          setConfirmOpen(true);
                        }}
                      >
                        <Icon color="error">close</Icon>
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </StyledTable>
        </SimpleCard>
      </Box>

      <Dialog open={updateDialog} maxWidth="sm" fullWidth>
        <UpdateRole
          reloadRoles={reloadRoles}
          id={id}
          role={passRole}
          closeDialog={() => {
            setUpdateDialog(false);
          }}
        ></UpdateRole>
      </Dialog>

      <ConfirmationDialog
        open={confirmOpen}
        onConfirmDialogClose={() => setConfirmOpen(false)}
        title="Are you sure to delete?"
        onYesClick={async () => {
          setConfirmOpen(false);
          setDeletedRules((s) => [...s, id]);
          await axios.delete('/roles/' + id);
        }}
      ></ConfirmationDialog>
    </Container>
  );
};

export default ListRoles;
