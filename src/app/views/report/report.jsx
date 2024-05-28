import { SimpleCard } from 'app/components';
import {
  Box,
  styled,
  Grid,
  Autocomplete,
  Icon,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  IconButton
} from '@mui/material';
import { React, useEffect, useState, useRef } from 'react';
import { ROWS_PER_PAGE } from 'app/utils/constant';
import CurrencyFormatter from 'app/utils/CurrencyFormatter';
import { LoadingButton } from '@mui/lab';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { TextValidator, ValidatorForm } from 'react-material-ui-form-validator';
import moment from 'moment';
import { Button } from 'primereact/button';
import { APP_DATETIME_FORMAT } from 'app/utils/constant';
import axios from 'axios';
import { fakeTableData } from './fakeTableDate';

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

const TextField = styled(TextValidator)(() => ({
  width: '100%',
  marginBottom: '16px'
}));

const OverallReport = () => {
  const [subscribarList, setsubscribarList] = useState([]);
  const [state, setState] = useState({
    startDate: moment(new Date()).format('YYYY-MM-DD'),
    endDate: moment(new Date()).format('YYYY-MM-DD')
  });
  const [rowsPerPage, setRowsPerPage] = useState(ROWS_PER_PAGE);
  const [pageCount, setPageCount] = useState(0);
  const [page, setPage] = useState(0);
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(false);
  const [activePage, setActivePage] = useState(0);
  const today = new Date();
  const [employee, setEmployee] = useState(null);
  const todayDate = useState(moment(today).format('YYYY-MM-DD'));
  const datatable = useRef(null);
  const tableRef = useRef(null);

  useEffect(() => {}, []);

  const handleChange = (event) => {
    event.persist();
    setState({ ...state, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    setLoading(true);
    const res = await axios.post('/roles/find-by-criteria', {
      name: event.target.name.value ? event.target.name.value : null,
      description: event.target.description.value ? event.target.description.value : null
    });

    setsubscribarList(res.data);
    setLoading(false);
  };

  const searchrole = () => {};

  const exportExcel = (filename) => {
    import('xlsx').then((xlsx) => {
      const worksheet = xlsx.utils.json_to_sheet(subscribarList);
      const workbook = { Sheets: { data: worksheet }, SheetNames: ['data'] };
      const excelBuffer = xlsx.write(workbook, {
        bookType: 'xlsx',
        type: 'array'
      });
      saveAsExcelFile(excelBuffer, filename);
    });
  };
  const saveAsExcelFile = (buffer, fileName) => {
    import('file-saver').then((module) => {
      if (module && module.default) {
        let EXCEL_TYPE =
          'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
        let EXCEL_EXTENSION = '.xlsx';
        const data = new Blob([buffer], {
          type: EXCEL_TYPE
        });

        module.default.saveAs(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);
      }
    });
  };

  const { startDate, endDate } = state;

  return (
    <Container>
      <SimpleCard title="Overral Report">
        <ValidatorForm onSubmit={handleSubmit} onError={() => null}>
          <Grid direction="row" container item={true} spacing={2}>
            <Grid item xs={12} md={6} lg={3}>
              <TextField
                label="Start Date"
                type="date"
                name="startDate"
                required
                onChange={handleChange}
                value={startDate || todayDate}
                defaultValue={todayDate}
                InputLabelProps={{
                  shrink: true
                }}
              />
            </Grid>
            <Grid item xs={12} md={6} lg={3}>
              <TextField
                label="End Date"
                type="date"
                name="endDate"
                required
                onChange={handleChange}
                value={endDate || todayDate}
                defaultValue={todayDate}
                InputLabelProps={{
                  shrink: true
                }}
              />
            </Grid>
            <Grid item xs={12} md={6} lg={3}>
              <TextField
                label="Name"
                type="text"
                name="name"
                onChange={handleChange}
                defaultValue={''}
                InputLabelProps={{
                  shrink: true
                }}
              />
            </Grid>
            <Grid item xs={12} md={6} lg={3}>
              <TextField
                label="Description"
                type="text"
                name="description"
                onChange={handleChange}
                defaultValue={''}
                InputLabelProps={{
                  shrink: true
                }}
              />
            </Grid>

            <Grid item xs={12} md={12} lg={12}>
              <div
                style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}
              >
                <div style={{}}>
                  <LoadingButton
                    onclick={searchrole}
                    type="submit"
                    color="primary"
                    loading={loading}
                    variant="contained"
                    sx={{ my: 2 }}
                  >
                    Search
                  </LoadingButton>
                </div>
                <div style={{}}>
                  <LoadingButton
                    onClick={(e) => {
                      e.preventDefault();
                      exportExcel('data');
                    }}
                    type="button"
                    color="primary"
                    variant="contained"
                    sx={{ my: 2 }}
                  >
                    Excel Export
                  </LoadingButton>
                </div>
              </div>
            </Grid>
          </Grid>
        </ValidatorForm>
        <Box width="100%" overflow="auto">
          <DataTable
            ref={tableRef}
            value={subscribarList}
            tableStyle={{ minWidth: '50rem' }}
            rows={10}
            rowsPerPageOptions={[5, 10, 25, 50, 100]}
            paginator
            stripedRows
            showGridlines
            filterMatchMode="contains" // Match mode for the global filter
          >
            <Column field="id" header="Id"></Column>
            <Column field="name" header="Name"></Column>
            <Column field="description" header="Description"></Column>
            <Column field="active" header="Active"></Column>
          </DataTable>
        </Box>
      </SimpleCard>
    </Container>
  );
};

export default OverallReport;
