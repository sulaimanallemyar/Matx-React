import { SimpleCard, ConfirmationDialog } from 'app/components';
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
import useUser from 'app/hooks/useUser';
import UserUpdate from './user-update';
import { SUCCESS_DELETE_MESSAGE } from 'app/utils/constant';
import { toast } from 'react-toastify';

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

const AppTable = () => {
  const [id, setId] = useState(0);
  const [currentEntity, setCurrentEntity] = useState(null);
  const { entities, getEntities, deleteEntity, updateSuccess } = useUser();
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [updateDialog, setUpdateDialog] = useState(false);

  useEffect(() => {
    getEntities();
  }, []);

  useEffect(() => {
    if (updateSuccess) {
      if (confirmOpen) {
        setConfirmOpen(false);
        toast.success(SUCCESS_DELETE_MESSAGE);
      }

      getEntities();
      setUpdateDialog(false);
    }
  }, [updateSuccess]);

  const onCreate = () => {
    setCurrentEntity(null);
    setUpdateDialog(true);
  };

  const onEdit = (entity) => {
    setCurrentEntity(entity);
    setUpdateDialog(true);
  };

  const onDelete = (id) => {
    setId(id);
    setConfirmOpen(true);
  };

  const onDeleteConfirm = () => {
    deleteEntity(id);
  };

  return (
    <Container>
      <Box width="100%" overflow="auto">
        <StyledButton variant="contained" color="primary" onClick={() => onCreate()}>
          <Icon>add</Icon>Create
        </StyledButton>
        <SimpleCard title="Users">
          <StyledTable>
            <TableHead>
              <TableRow>
                <TableCell align="left">Username</TableCell>
                <TableCell align="left">FirstName</TableCell>
                <TableCell align="left">LastName</TableCell>
                <TableCell align="center">Action</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {entities?.map((subscriber, index) => (
                <TableRow key={index}>
                  <TableCell align="left">{subscriber.username}</TableCell>
                  <TableCell align="left">{subscriber.firstName}</TableCell>
                  <TableCell align="left">{subscriber.lastName}</TableCell>
                  <TableCell align="center">
                    <IconButton onClick={() => onEdit(subscriber)}>
                      <Icon color="primary">edit</Icon>
                    </IconButton>
                    <IconButton onClick={() => onDelete(subscriber.id)}>
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
        <UserUpdate
          currentEntity={currentEntity}
          closeDialog={() => {
            setUpdateDialog(false);
          }}
        ></UserUpdate>
      </Dialog>

      <ConfirmationDialog
        open={confirmOpen}
        onConfirmDialogClose={() => setConfirmOpen(false)}
        title="Are you sure to delete?"
        onYesClick={() => onDeleteConfirm()}
      ></ConfirmationDialog>
    </Container>
  );
};

export default AppTable;
