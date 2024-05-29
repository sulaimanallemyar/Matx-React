import { Box, Slider, Typography } from '@mui/material';
import React from 'react';

function valuetext(value: any) {
  return `${value}°C`;
}

export default function RangeSlider() {
  const [value, setValue] = React.useState([20, 37]);

  const handleChange = (_: any, newValue: any) => {
    setValue(newValue);
  };

  return (
    <Box width={300}>
      <Typography id="range-slider" gutterBottom>
        Temperature range
      </Typography>

      <Slider
        value={value}
        onChange={handleChange}
        valueLabelDisplay="auto"
        aria-labelledby="range-slider"
        getAriaValueText={valuetext}
      />
    </Box>
  );
}
