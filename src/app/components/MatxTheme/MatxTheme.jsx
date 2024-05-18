import { CssBaseline, ThemeProvider } from '@mui/material';
import { useSettingsStore } from 'app/contexts/SettingsContext';

const MatxTheme = ({ children }) => {
  const { settings } = useSettingsStore();
  let activeTheme = { ...settings.themes[settings.activeTheme] };

  return (
    <ThemeProvider theme={activeTheme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
};

export default MatxTheme;
