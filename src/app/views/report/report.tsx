import { SimpleCard } from '../../components';
import { Box, styled } from '@mui/material';
import React, { useEffect, useState, useRef } from 'react';
import { ROWS_PER_PAGE } from '../../utils/constant';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import axios from 'axios';
import { ReportHeaderInputs, SearchData } from 'src/app/components/report-header-inputs';

const Container = styled('div')(({ theme }) => ({
  margin: '30px',
  [theme.breakpoints.down('sm')]: { margin: '16px' },
  '& .breadcrumb': {
    marginBottom: '30px',
    [theme.breakpoints.down('sm')]: { marginBottom: '16px' }
  }
}));

const OverallReport = () => {
  const [reportData, setReportData] = useState([]);
  const tableRef: any = useRef(null);

  useEffect(() => {}, []);

  const handleSubmit = async (data: SearchData) => {
    try {
      const res = await axios.post('/reporting/find-by-criteria', {
        startDate: data.startDate,
        endDate: data.endDate,
        companyTin: data.companyTin,
        type: data.customsProcedure
      });

      setReportData(res.data);
    } catch (error) {}
  };

  return (
    <Container>
      <SimpleCard title="Overral Report">
        <ReportHeaderInputs
          showStartDate
          showEndDate
          ShowTinNumber
          showCustomsProcedure
          onSearch={handleSubmit}
          tabelRef={tableRef}
        />
        <Box width="100%" overflow="auto">
          <DataTable
            ref={tableRef}
            value={reportData}
            rows={ROWS_PER_PAGE}
            rowsPerPageOptions={[5, 10, 25, 50, 100]}
            paginator
            stripedRows
            showGridlines
          >
            <Column filter filterField="finName" field={'finName'} header={'finName'} />
            <Column field={'status'} header={'status'} />
            <Column field={'borderCustoms'} header={'borderCustoms'} />
            <Column filter filterField="brokerName" field={'brokerName'} header={'brokerName'} />
            <Column field={'brokerTIN'} header={'brokerTIN'} />
            <Column field={'cmpFisCod'} header={'cmpFisCod'} />
            <Column field={'cmpName'} header={'cmpName'} />
            <Column field={'companyTin'} header={'companyTin'} />
            <Column field={'countryOrg'} header={'countryOrg'} />
            <Column field={'currencyRate'} header={'currencyRate'} />
            <Column field={'currrencyCode'} header={'currrencyCode'} />
            <Column field={'customsProc'} header={'customsProc'} />
            <Column field={'destCustoms'} header={'destCustoms'} />
            <Column field={'dsc1'} header={'dsc1'} />
            <Column field={'dsc2'} header={'dsc2'} />
            <Column field={'gdsOrgCty'} header={'gdsOrgCty'} />
            <Column field={'hsCode'} header={'hsCode'} />
            <Column field={'ideCuoCod'} header={'ideCuoCod'} />
            <Column field={'itemGrossWeight'} header={'itemGrossWeight'} />
            <Column field={'itemNetWeight'} header={'itemNetWeight'} />
            <Column field={'itemNo'} header={'itemNo'} />
            <Column field={'itemTaxes'} header={'itemTaxes'} />
            <Column field={'itemTotal'} header={'itemTotal'} />
            <Column field={'itemValueAfs'} header={'itemValueAfs'} />
            <Column field={'itemValueCurrency'} header={'itemValueCurrency'} />
            <Column field={'locGoods'} header={'locGoods'} />
            <Column field={'pkgNbr'} header={'pkgNbr'} />
            <Column field={'procExt'} header={'procExt'} />
            <Column field={'refYear'} header={'refYear'} />
            <Column field={'regDate'} header={'regDate'} />
            <Column field={'regNo'} header={'regNo'} />
            <Column field={'sadFlw'} header={'sadFlw'} />
            <Column filter field={'taxCode'} header={'taxCode'} />
            <Column field={'taxDecription'} header={'taxDecription'} />
            <Column field={'taxRate'} header={'taxRate'} />
            <Column field={'tptCuoCod'} header={'tptCuoCod'} />
            <Column field={'truck1'} header={'truck1'} />
            <Column field={'typeOfPack'} header={'typeOfPack'} />
            <Column field={'typeSad'} header={'typeSad'} />
            {/* {reportData.length > 0 &&
              Object.keys(reportData[0]).map((keys, index) => (
                <Column key={index} field={keys} header={keys} />
              ))} */}
            {/* <Column field="id" header="Id"></Column>
            <Column field="name" header="Name"></Column>
            <Column field="description" header="Description"></Column>
            <Column field="active" header="Active"></Column> */}
          </DataTable>
        </Box>
      </SimpleCard>
    </Container>
  );
};

export default OverallReport;
