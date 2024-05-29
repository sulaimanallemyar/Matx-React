import React from 'react';
import { TextField, TextFieldProps } from '@mui/material';
import { Col, ColProps } from './col';
interface CustomProps {}
type NumberInputProps = TextFieldProps & CustomProps & ColProps;
export const NumberInput = ({
  label,
  name,
  value,
  onChange,
  xs,
  md,
  lg,
  xl,
  style,
  ...res
}: NumberInputProps) => {
  return (
    <Col xs={xs} md={md} lg={lg} xl={xl}>
      <TextField
        style={{ width: '100%', ...style }}
        label={label}
        type="number"
        name={name}
        onChange={onChange}
        value={value}
        {...res}
      />
    </Col>
  );
};
