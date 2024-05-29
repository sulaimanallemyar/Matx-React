import React, { ReactNode } from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem, { MenuItemProps } from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent, SelectProps } from '@mui/material/Select';
import { Col, ColProps } from './col';
export interface DropdownProps extends SelectProps, ColProps {
  options?: Array<any>;
  value?: string | null;
  classname?: string;
  optionValue?: string;
  optionLabel?: string;
  onChange?: (event: SelectChangeEvent<any>, child: ReactNode) => void;
  menuItem?: MenuItemProps;
  id: string;
  children?: any;
}
export const Dropdown = ({
  id,
  options,
  style,
  classname,
  label,
  optionLabel = 'label',
  optionValue = 'name',
  value,
  onChange,
  xs,
  md,
  lg,
  xl,
  menuItem,
  ...res
}: DropdownProps) => {
  const handleChange = (event: SelectChangeEvent<unknown>, child: ReactNode) => {
    if (onChange) onChange(event, child);
  };

  return (
    <Col xs={xs} md={md} lg={lg} xl={xl}>
      <FormControl sx={{ width: '100%' }}>
        <InputLabel id={id}>{label}</InputLabel>
        <Select
          labelId={id}
          id={id}
          value={value || ''}
          label={label}
          onChange={handleChange}
          {...res}
        >
          {options?.map((item, index) => (
            <MenuItem key={index} value={item[optionValue]} {...menuItem}>
              {item[optionLabel]}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Col>
  );
};
