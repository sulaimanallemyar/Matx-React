import { ThemeProvider, useTheme } from '@mui/material';
import { useSettingsStore } from 'app/contexts/SettingsContext';

const SidenavTheme = ({ children }) => {
  const theme = useTheme();
  const { settings } = useSettingsStore();
  const sidenavTheme = settings.themes[settings.layout1Settings.leftSidebar.theme] || theme;

  return <ThemeProvider theme={sidenavTheme}>{children}</ThemeProvider>;
};

export default SidenavTheme;
