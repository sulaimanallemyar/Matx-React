import React from 'react';
import { Grid } from '@mui/material';

interface CustomProps {
  children?: any;
}
type RowProps = CustomProps;
export const Row = ({ children, ...res }: RowProps) => {
  return (
    <Grid direction="row" container item={true} spacing={2} style={{ marginBlock: '16px' }}>
      {children || ''}
    </Grid>
  );
};
