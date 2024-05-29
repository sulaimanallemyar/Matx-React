import React from 'react';
import { Dropdown, DropdownProps } from './base-component';

const customsProcedure = [
  { label: 'Import', name: 'I' },
  { label: 'Export', name: 'E' },
  { label: 'All', name: 'all' }
];
export const CustomsProcedure = ({
  label,
  options,
  optionLabel,
  optionValue,
  ...res
}: DropdownProps) => {
  return (
    <Dropdown
      label={'Customs Procedure'}
      options={customsProcedure}
      optionLabel="label"
      optionValue="name"
      {...res}
    />
  );
};
