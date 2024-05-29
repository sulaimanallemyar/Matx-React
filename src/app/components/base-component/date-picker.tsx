import React from 'react';
import { TextField, TextFieldProps } from '@mui/material';
import { Col, ColProps } from './col';
interface CustomProps {}
type DatePickerProps = TextFieldProps & ColProps & CustomProps;
export const DatePicker = ({
  label,
  name,
  value,
  onChange,
  xs,
  md,
  lg,
  xl,
  style,
  InputLabelProps,
  ...res
}: DatePickerProps) => {
  return (
    <Col xs={xs} md={md} lg={lg} xl={xl}>
      <TextField
        style={{ width: '100%', ...style }}
        label={label}
        type="date"
        name={name}
        onChange={onChange}
        value={value}
        InputLabelProps={{
          shrink: true,
          ...InputLabelProps
        }}
        {...res}
      />
    </Col>
  );
};
