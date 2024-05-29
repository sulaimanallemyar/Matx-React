import React from 'react';
import { Grid } from '@mui/material';

interface CustomProps {
  xs?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
  md?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
  lg?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
  xl?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
  children?: any;
}
// GridProps &
export type ColProps = CustomProps;
export const Col = ({ xs, md, lg, xl, children = <></>, ...res }: ColProps) => {
  return (
    <Grid item xs={xs} md={md} lg={lg} xl={xl} {...res}>
      {children}
    </Grid>
  );
};
